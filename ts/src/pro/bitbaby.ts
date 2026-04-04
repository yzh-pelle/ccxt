
//  ---------------------------------------------------------------------------

import bitbabyRest from '../bitbaby.js';
// import { ArgumentsRequired, ExchangeError } from '../base/errors.js';
// import { Precise } from '../base/Precise.js';
// import { ArrayCache, ArrayCacheBySymbolById, ArrayCacheByTimestamp } from '../base/ws/Cache.js';
import type { Dict, Market, Ticker } from '../base/types.js';
import Client from '../base/ws/Client.js';

//  ---------------------------------------------------------------------------

export default class bitbaby extends bitbabyRest {
    describe (): any {
        return this.deepExtend (super.describe (), {
            'has': {
                'watchOHLCV': true,
                'watchOrderBook': true,
                'watchTicker': true,
                'watchTrades': true,
                'unWatchOHLCV': true,
                'unWatchOrderBook': true,
                'unWatchTicker': true,
                'unWatchTrades': true,
            },
            'urls': {
                'api': {
                    'ws': {
                        'spot': 'wss://openapi.bitbaby.com/spot/ws',
                        'contract': 'wss://openapi.bitbaby.com/futures/ws',
                    },
                },
            },
            'options': {},
            'streaming': {
                'keepAlive': 29000,
                // 'ping': this.ping,
            },
        });
    }

    handlePong (client: Client, message) {
        client.lastPong = this.safeTimestamp (message, 'pong');
        return message;
    }

    handlePing (client: Client, message) {
        client.lastPong = this.safeTimestamp (message, 'ping', this.milliseconds ());
        this.spawn (this.pong, client, message);
    }

    async pong (client, message) {
        //
        //
        const time = this.safeInteger (message, 'ping');
        const pong: Dict = {
            'ping': time,
        };
        await client.send (pong);
    }

    async subscribe (channel, symbol, params = {}, subscription = undefined) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        let marketType = 'spot';
        if (market['contract']) {
            marketType = 'contract';
        }
        const url = this.urls['api']['ws'][marketType];
        const message: Dict = {
            'event': 'sub',
            'params': {
                'channel': channel,
            },
        };
        const unsubscribe = this.safeBool (subscription, 'unsubscribe', false);
        if (unsubscribe) {
            // exchange does not send confirmation of unsubscription
            // we send unsubscription request and clean up local subscriptions and caches
            message['event'] = 'unsub';
            const client = this.client (url);
            const result = await client.send (message);
            this.handleUnSubscribe (client, subscription);
            return result;
        }
        return await this.watch (url, channel, this.deepExtend (message, params), channel, subscription);
    }

    handleUnSubscribe (client: Client, subscription) {
        const subMessageHashes = this.safeValue (subscription, 'subMessageHashes', []);
        for (let i = 0; i < subMessageHashes.length; i++) {
            const subHash = subMessageHashes[i];
            const unsubHash = 'unsubscribe:' + subHash;
            this.cleanUnsubscription (client, subHash, unsubHash);
        }
        this.cleanCache (subscription);
    }

    getWsMarketId (market) {
        let marketId = market['lowercaseId'];
        if (market['contract']) {
            const parts = marketId.split ('-');
            const prefix = this.safeString (parts, 0);
            const baseId = this.safeString (parts, 1);
            const quoteId = this.safeString (parts, 2);
            marketId = prefix + '_' + baseId + quoteId;
        }
        return marketId;
    }

    /**
     * @method
     * @name bitbaby#watchTicker
     * @description watches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/websocket-tui-song
     * @param {string} symbol unified symbol of the market to fetch the ticker for
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/?id=ticker-structure}
     */
    async watchTicker (symbol: string, params = {}): Promise<Ticker> {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const marketId = this.getWsMarketId (market);
        const channel = 'market_' + marketId;
        return await this.subscribe (channel, symbol, params);
    }

    /**
     * @method
     * @name bitbaby#unWatchTicker
     * @description unWatches a price ticker
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/websocket-tui-song
     * @param {string} symbol unified symbol of the market to fetch the ticker for
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    async unWatchTicker (symbol: string, params = {}): Promise<any> {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const marketId = this.getWsMarketId (market);
        const channel = 'market_' + marketId;
        const subscription: Dict = {
            'unsubscribe': true,
            'subMessageHashes': [ channel ],
            'symbols': [ symbol ],
            'topic': 'ticker',
        };
        return await this.subscribe (channel, symbol, params, subscription);
    }

    handleTicker (client: Client, message) {
        //
        // spot
        //     {
        //         "channel": "market_ethusdt",
        //         "tick": {
        //             "symbol": "ETHUSDT",
        //             "open": "2067.29",
        //             "close": "2052.41",
        //             "amount": "6657899.83742",
        //             "vol": "3240.042",
        //             "high": "2080.25",
        //             "low": "2041.91",
        //             "rose": "-0.7183421534",
        //             "rose7d": "2.379907218",
        //             "rose1h": "-0.1090210011",
        //             "rose4h": "0.0750900837",
        //             "rose24h": "-0.7183421534",
        //             "timestamp": 1775288948,
        //             "utime": "2026-04-04T07:49:08Z",
        //             "lastDealId": 0,
        //             "base": "ETH",
        //             "quote": "USDT",
        //             "ts": 1775288948000
        //         },
        //         "ts": "2026-04-04T07:49:08Z"
        //     }
        //
        // contract
        //     {
        //         "channel": "market_e_ethusdt",
        //         "tick": {
        //             "symbol": "E_ETHUSDT",
        //             "open": "2066.17",
        //             "close": "2052.49",
        //             "amount": "15027318102.58",
        //             "vol": "7316331",
        //             "piece": "0",
        //             "high": "2080.29",
        //             "low": "2040.39",
        //             "rose": "-0.5576550388",
        //             "rose7d": "2.4232383367",
        //             "rose1h": "-0.0058462153",
        //             "rose4h": "0.1107198252",
        //             "rose24h": "-0.5576550388",
        //             "timestamp": 1775287987,
        //             "utime": "2026-04-04T07:33:07Z",
        //             "base": "ETH",
        //             "quote": "USDT",
        //             "sign_price": "2052.49",
        //             "index_price": "2053.405",
        //             "funding_rate_last": "0.0000175560529949",
        //             "funding_rate_next": "0.0000800000000000",
        //             "ts": 1775287987000,
        //             "admin_fund_rate_source": "'third'",
        //             "last_fund_rate_third": "0.00005418"
        //         },
        //         "ts": "2026-04-04T07:33:07Z"
        //     }
        //
        const data = this.safeDict (message, 'tick', {});
        const ticker = this.parseWsTicker (data);
        const symbol = ticker['symbol'];
        this.tickers[symbol] = ticker;
        const channel = this.safeString (message, 'channel');
        client.resolve (this.tickers[symbol], channel);
    }

    parseWsTicker (ticker: Dict, market: Market = undefined): Ticker {
        let marketId = this.safeStringLower (ticker, 'symbol');
        const tickerSymbol = this.safeString (ticker, 'symbol', '');
        const parts = tickerSymbol.split ('_');
        const length = parts.length;
        if (length > 1) {
            const prefix = this.safeString (parts, 0);
            const baseId = this.safeString (ticker, 'base');
            const quoteId = this.safeString (ticker, 'quote');
            marketId = prefix + '-' + baseId + '-' + quoteId;
        }
        market = this.safeMarket (marketId, market);
        const timestamp = this.safeInteger (ticker, 'ts');
        const close = this.safeString (ticker, 'close');
        return this.safeTicker ({
            'symbol': market['symbol'],
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'high': this.safeString (ticker, 'high'),
            'low': this.safeString (ticker, 'low'),
            'bid': undefined,
            'bidVolume': undefined,
            'ask': undefined,
            'askVolume': undefined,
            'vwap': undefined,
            'open': this.safeString (ticker, 'open'),
            'close': close,
            'last': close,
            'previousClose': undefined,
            'change': undefined,
            'percentage': this.safeString (ticker, 'rose'),
            'average': undefined,
            'baseVolume': this.safeString (ticker, 'vol'),
            'quoteVolume': this.safeString (ticker, 'amount'),
            'markPrice': this.safeString (ticker, 'sign_price'), // todo check
            'indexPrice': this.safeString (ticker, 'index_price'),
            'info': ticker,
        }, market);
    }

    handleMessage (client: Client, message) {
        if ('ping' in message) {
            this.handlePing (client, message);
            return;
        }
        if ('pong' in message) {
            this.handlePong (client, message);
            return;
        }
        const channel = this.safeString (message, 'channel');
        // remove the 'e_' market prefix if it exists
        // for example, 'market_e_btcusdt' becomes 'market_btcusdt'
        const cleanChannel = channel.replace ('e_', '');
        const parts = cleanChannel.split ('_');
        const topic = this.safeString (parts, 2);
        if (topic === undefined) {
            // market_btcusdt
            this.handleTicker (client, message);
        }
    }
}
