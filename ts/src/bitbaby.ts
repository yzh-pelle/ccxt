
//  ---------------------------------------------------------------------------

import Exchange from './abstract/bitbaby.js';
import { NotSupported } from './base/errors.js';
import { Precise } from './base/Precise.js';
import { TICK_SIZE } from './base/functions/number.js';
// import { sha256 } from './static_dependencies/noble-hashes/sha256.js';
import type { Dict, FundingRate, Int, Market, OHLCV, OrderBook, Ticker, Trade } from './base/types.js';

//  ---------------------------------------------------------------------------

/**
 * @class bitbaby
 * @augments Exchange
 */
export default class bitbaby extends Exchange {
    describe (): any {
        return this.deepExtend (super.describe (), {
            'id': 'bitbaby',
            'name': 'BitBaby',
            'countries': [ 'AE' ], // United Arab Emirates
            'rateLimit': 100,
            'version': 'v1',
            'certified': false,
            'pro': true,
            'has': {
                'CORS': undefined,
                'spot': true,
                'margin': true,
                'swap': true,
                'future': false,
                'option': false,
                'addMargin': false,
                'borrowCrossMargin': false,
                'borrowIsolatedMargin': false,
                'borrowMargin': false,
                'cancelAllOrders': false,
                'cancelOrder': true,
                'cancelOrders': false,
                'cancelOrdersWithClientOrderId': false,
                'cancelOrderWithClientOrderId': false,
                'closeAllPositions': false,
                'closePosition': false,
                'createDepositAddress': false,
                'createLimitBuyOrder': false,
                'createLimitOrder': true,
                'createLimitSellOrder': false,
                'createMarketBuyOrder': false,
                'createMarketBuyOrderWithCost': false,
                'createMarketOrder': true,
                'createMarketOrderWithCost': false,
                'createMarketSellOrder': false,
                'createMarketSellOrderWithCost': false,
                'createOrder': true,
                'createOrders': false,
                'createOrderWithTakeProfitAndStopLoss': false,
                'createPostOnlyOrder': false,
                'createReduceOnlyOrder': false,
                'createStopLimitOrder': false,
                'createStopLossOrder': false,
                'createStopMarketOrder': false,
                'createStopOrder': false,
                'createTakeProfitOrder': false,
                'createTrailingAmountOrder': false,
                'createTrailingPercentOrder': false,
                'createTriggerOrder': false,
                'deposit': false,
                'editOrder': false,
                'editOrders': false,
                'editOrderWithClientOrderId': false,
                'fetchAccounts': false,
                'fetchADLRank': false,
                'fetchBalance': true,
                'fetchBidsAsks': false,
                'fetchBorrowInterest': false,
                'fetchBorrowRate': false,
                'fetchBorrowRateHistories': false,
                'fetchBorrowRateHistory': false,
                'fetchBorrowRates': false,
                'fetchBorrowRatesPerSymbol': false,
                'fetchCanceledAndClosedOrders': false,
                'fetchCanceledOrders': false,
                'fetchClosedOrder': false,
                'fetchClosedOrders': false,
                'fetchConvertCurrencies': false,
                'fetchConvertQuote': false,
                'fetchConvertTrade': false,
                'fetchConvertTradeHistory': false,
                'fetchCrossBorrowRate': false,
                'fetchCrossBorrowRates': false,
                'fetchCurrencies': false,
                'fetchDeposit': false,
                'fetchDepositAddress': false,
                'fetchDepositAddresses': false,
                'fetchDepositAddressesByNetwork': false,
                'fetchDeposits': false,
                'fetchDepositsWithdrawals': false,
                'fetchDepositWithdrawFee': false,
                'fetchDepositWithdrawFees': false,
                'fetchFundingHistory': false,
                'fetchFundingInterval': false,
                'fetchFundingIntervals': false,
                'fetchFundingRate': true,
                'fetchFundingRateHistory': false,
                'fetchFundingRates': false,
                'fetchGreeks': false,
                'fetchIndexOHLCV': false,
                'fetchIsolatedBorrowRate': false,
                'fetchIsolatedBorrowRates': false,
                'fetchIsolatedPositions': false,
                'fetchL2OrderBook': true,
                'fetchL3OrderBook': false,
                'fetchLastPrices': false,
                'fetchLedger': false,
                'fetchLedgerEntry': false,
                'fetchLeverage': false,
                'fetchLeverages': false,
                'fetchLeverageTiers': false,
                'fetchLiquidations': false,
                'fetchLongShortRatio': false,
                'fetchLongShortRatioHistory': false,
                'fetchMarginAdjustmentHistory': false,
                'fetchMarginMode': false,
                'fetchMarginModes': false,
                'fetchMarketLeverageTiers': false,
                'fetchMarkets': true,
                'fetchMarkOHLCV': false,
                'fetchMarkPrices': false,
                'fetchMyLiquidations': false,
                'fetchMySettlementHistory': false,
                'fetchMyTrades': false,
                'fetchOHLCV': false,
                'fetchOpenInterest': false,
                'fetchOpenInterestHistory': false,
                'fetchOpenInterests': false,
                'fetchOpenOrder': false,
                'fetchOpenOrders': false,
                'fetchOption': false,
                'fetchOptionChain': false,
                'fetchOrder': false,
                'fetchOrderBook': true,
                'fetchOrderBooks': false,
                'fetchOrders': false,
                'fetchOrdersByStatus': false,
                'fetchOrderTrades': false,
                'fetchOrderWithClientOrderId': false,
                'fetchPosition': false,
                'fetchPositionADLRank': false,
                'fetchPositionHistory': false,
                'fetchPositionMode': false,
                'fetchPositions': false,
                'fetchPositionsADLRank': false,
                'fetchPositionsForSymbol': false,
                'fetchPositionsHistory': false,
                'fetchPositionsRisk': false,
                'fetchPremiumIndexOHLCV': false,
                'fetchSettlementHistory': false,
                'fetchStatus': true,
                'fetchTicker': true,
                'fetchTickers': false,
                'fetchTime': true,
                'fetchTrades': true,
                'fetchTradingFee': false,
                'fetchTradingFees': false,
                'fetchTradingLimits': false,
                'fetchTransactionFee': false,
                'fetchTransactionFees': false,
                'fetchTransactions': false,
                'fetchTransfer': false,
                'fetchTransfers': false,
                'fetchUnderlyingAssets': false,
                'fetchVolatilityHistory': false,
                'fetchWithdrawAddresses': false,
                'fetchWithdrawal': false,
                'fetchWithdrawals': false,
                'fetchWithdrawalWhitelist': false,
                'privateAPI': true,
                'publicAPI': true,
                'reduceMargin': false,
                'repayCrossMargin': false,
                'repayIsolatedMargin': false,
                'sandbox': false,
                'setLeverage': false,
                'setMargin': false,
                'setMarginMode': false,
                'setPositionMode': false,
                'signIn': false,
                'transfer': false,
                'withdraw': false,
            },
            'urls': {
                'logo': '', // todo
                'api': {
                    'public': 'https://openapi.bitbaby.com',
                    'private': 'https://openapi.bitbaby.com',
                },
                'www': 'https://www.bitbaby.com',
                'doc': [
                    'https://bitbaby-1.gitbook.io/bitbaby-api',
                ],
            },
            'api': {
                'public': {
                    'get': {
                        'spot/open/sapi/v1/ping': 1, // done check rate limit
                        'spot/open/sapi/v1/time': 1, // done check rate limit
                        'spot/open/sapi/v1/symbols': 1, // done check rate limit
                        'spot/open/sapi/v1/depth': 1, // done check rate limit
                        'spot/open/sapi/v1/ticker': 1, // done check rate limit
                        'spot/open/sapi/v1/trades': 1, // done check rate limit
                        'spot/open/sapi/v1/klines': 1, // todo - empty response
                        'futures/open/fapi/v1/ping': 1, // done check rate limit
                        'futures/open/fapi/v1/time': 1, // done check rate limit
                        'futures/open/fapi/v1/contracts': 1, // done check rate limit
                        'futures/open/fapi/v1/depth': 1, // done check rate limit
                        'futures/open/fapi/v1/ticker': 1, // done check rate limit
                        'futures/open/fapi/v1/index': 1, // done check rate limit
                        'futures/open/fapi/v1/klines': 1, // todo - empty response
                    },
                },
                'private': {
                    'get': {
                        'spot/open/sapi/v1/order': 1,
                        'spot/open/sapi/v1/openOrders': 1,
                        'spot/open/sapi/v1/myTrades': 1,
                        'spot/open/sapi/v1/account': 1,
                        'spot/open/sapi/v1/margin/order': 1,
                        'spot/open/sapi/v1/margin/openOrders': 1,
                        'spot/open/sapi/v1/margin/myTrades': 1,
                        'futures/open/fapi/v1/order': 1,
                        'futures/open/fapi/v1/openOrders': 1,
                        'futures/open/fapi/v1/myTrades': 1,
                        'futures/open/fapi/v1/account': 1,
                    },
                    'post': {
                        'spot/open/sapi/v1/margin/order': 1,
                        'spot/open/sapi/v1/margin/cancel': 1,
                        'spot/open/sapi/v1/order': 1,
                        'spot/open/sapi/v1/order/test': 1,
                        'spot/open/sapi/v1/batchOrders': 1,
                        'spot/open/sapi/v1/cancel': 1,
                        'spot/open/sapi/v1/batchCancel': 1,
                        'futures/open/fapi/v1/order': 1,
                        'futures/open/fapi/v1/conditionOrder': 1,
                        'futures/open/fapi/v1/cancel': 1,
                        'futures/open/fapi/v1/orderHistorical': 1,
                        'futures/open/fapi/v1/profitHistorical': 1,
                    },
                },
            },
            'timeframes': {
                '1m': '1min',
                '5m': '5min',
                '15m': '15min',
                '30m': '30min',
                '1h': '1hour',
                '4h': '4hour',
                '1d': '1day',
                '1w': '1week',
                '1M': '1month',
            },
            'precisionMode': TICK_SIZE,
            'exceptions': {
                'exact': {
                    // {"code":"1","msg":"fail","data":null,"message":null,"succ":false}
                    // {"code":"-1121","msg":"Invalid contract","data":null}
                    // {"code":"-1121","msg":"无效的合约","data":null}
                    // {"code":"-1102","msg":"Forced parameter {0} not sent, empty or incorrect format","data":null}
                },
                'broad': {
                },
            },
            'fees': {
                'trading': {
                    'tierBased': false,
                    'percentage': true,
                    'taker': this.parseNumber ('0.2'),
                    'maker': this.parseNumber ('0.2'),
                },
                'spot': {
                    'tierBased': false,
                    'percentage': true,
                    'taker': this.parseNumber ('0.2'),
                    'maker': this.parseNumber ('0.2'),
                },
                'contract': {
                    'tierBased': true,
                    'percentage': true,
                    'taker': this.parseNumber ('0.0006'),
                    'maker': this.parseNumber ('0.0002'),
                    'tiers': {
                        'taker': [
                            [ this.parseNumber ('0'), this.parseNumber ('0.06') ],
                            [ this.parseNumber ('1000000'), this.parseNumber ('0.058') ],
                            [ this.parseNumber ('5000000'), this.parseNumber ('0.056') ],
                            [ this.parseNumber ('8000000'), this.parseNumber ('0.054') ],
                            [ this.parseNumber ('15000000'), this.parseNumber ('0.052') ],
                            [ this.parseNumber ('15000000'), this.parseNumber ('0.05') ],
                            [ this.parseNumber ('40000000'), this.parseNumber ('0.048') ],
                            [ this.parseNumber ('80000000'), this.parseNumber ('0.044') ],
                            [ this.parseNumber ('100000000'), this.parseNumber ('0.042') ],
                            [ this.parseNumber ('150000000'), this.parseNumber ('0.04') ],
                            [ this.parseNumber ('200000000'), this.parseNumber ('0.035') ],
                        ],
                        'maker': [
                            [ this.parseNumber ('0'), this.parseNumber ('0.02') ],
                            [ this.parseNumber ('1000000'), this.parseNumber ('0.019') ],
                            [ this.parseNumber ('5000000'), this.parseNumber ('0.0185') ],
                            [ this.parseNumber ('8000000'), this.parseNumber ('0.018') ],
                            [ this.parseNumber ('15000000'), this.parseNumber ('0.0175') ],
                            [ this.parseNumber ('15000000'), this.parseNumber ('0.017') ],
                            [ this.parseNumber ('40000000'), this.parseNumber ('0.0165') ],
                            [ this.parseNumber ('80000000'), this.parseNumber ('0.0155') ],
                            [ this.parseNumber ('100000000'), this.parseNumber ('0.0145') ],
                            [ this.parseNumber ('150000000'), this.parseNumber ('0.0125') ],
                            [ this.parseNumber ('200000000'), this.parseNumber ('0.01') ],
                        ],
                    },
                },
            },
            'commonCurrencies': {
            },
            'options': {
                'timeDifference': 0, // the difference between system clock and Binance clock
                'adjustForTimeDifference': false, // controls the adjustment logic upon instantiation
                'accountsByType': {
                },
                'networks': {
                },
            },
            'features': {
                'spot': {
                    'sandbox': false,
                    'createOrder': {
                        'marginMode': true,
                        'triggerPrice': true,
                        'triggerPriceType': undefined,
                        'triggerDirection': false, // true for uta
                        'stopLossPrice': true,
                        'takeProfitPrice': true,
                        'attachedStopLossTakeProfit': undefined, // not supported
                        'timeInForce': {
                            'IOC': true,
                            'FOK': true,
                            'PO': true,
                            'GTD': true,
                        },
                        'hedged': false,
                        'trailing': false,
                        'leverage': false,
                        'marketBuyByCost': true,
                        'marketBuyRequiresPrice': false,
                        'selfTradePrevention': true, // todo implement
                        'iceberg': true, // todo implement
                    },
                    'createOrders': {
                        'max': 5,
                    },
                    'fetchMyTrades': {
                        'marginMode': true,
                        'limit': undefined,
                        'daysBack': undefined,
                        'untilDays': 7, // per  implementation comments
                        'symbolRequired': true,
                    },
                    'fetchOrder': {
                        'marginMode': false,
                        'trigger': true,
                        'trailing': false,
                        'symbolRequired': true,
                    },
                    'fetchOpenOrders': {
                        'marginMode': true,
                        'limit': 500,
                        'trigger': true,
                        'trailing': false,
                        'symbolRequired': true,
                    },
                    'fetchOrders': undefined,
                    'fetchClosedOrders': {
                        'marginMode': true,
                        'limit': 500,
                        'daysBack': undefined,
                        'daysBackCanceled': undefined,
                        'untilDays': 7,
                        'trigger': true,
                        'trailing': false,
                        'symbolRequired': true,
                    },
                    'fetchOHLCV': {
                        'limit': 1500,
                    },
                },
                'forDerivs': {
                    'sandbox': false,
                    'createOrder': {
                        'marginMode': true,
                        'triggerPrice': true,
                        'triggerPriceType': {
                            'last': true,
                            'mark': true,
                            'index': true,
                        },
                        'triggerDirection': true,
                        'stopLossPrice': true,
                        'takeProfitPrice': true,
                        'attachedStopLossTakeProfit': {
                            'triggerPriceType': {
                                'last': true,
                                'mark': true,
                                'index': true,
                            },
                            'price': true,
                        },
                        'timeInForce': {
                            'IOC': true,
                            'FOK': false,
                            'PO': true,
                            'GTD': false,
                        },
                        'hedged': false, // true for uta
                        'trailing': false,
                        'leverage': true, // todo implement
                        'marketBuyByCost': true,
                        'marketBuyRequiresPrice': false,
                        'selfTradePrevention': true, // todo implement
                        'iceberg': true,
                    },
                    'createOrders': {
                        'max': 20,
                    },
                    'fetchMyTrades': {
                        'marginMode': true,
                        'limit': 1000,
                        'daysBack': undefined,
                        'untilDays': 7,
                        'symbolRequired': false,
                    },
                    'fetchOrder': {
                        'marginMode': false,
                        'trigger': false,
                        'trailing': false,
                        'symbolRequired': false,
                    },
                    'fetchOpenOrders': {
                        'marginMode': false,
                        'limit': 1000,
                        'trigger': true,
                        'trailing': false,
                        'symbolRequired': false,
                    },
                    'fetchOrders': undefined,
                    'fetchClosedOrders': {
                        'marginMode': false,
                        'limit': 1000,
                        'daysBack': undefined,
                        'daysBackCanceled': undefined,
                        'untilDays': undefined,
                        'trigger': true,
                        'trailing': false,
                        'symbolRequired': false,
                    },
                    'fetchOHLCV': {
                        'limit': 500,
                    },
                },
                'swap': {
                    'linear': {
                        'extends': 'forDerivs',
                    },
                    'inverse': {
                        'extends': 'forDerivs',
                    },
                },
            },
        });
    }

    nonce () {
        return this.milliseconds () - this.options['timeDifference'];
    }

    /**
     * @method
     * @name bitbaby#fetchStatus
     * @description the latest known information on the availability of the exchange API
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/xian-huo-jiao-yi#ce-shi-lian-jie
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/he-yue-jiao-yi#ce-shi-lian-jie
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.type] spot or swap
     * @returns {object} a [status structure]{@link https://docs.ccxt.com/?id=exchange-status-structure}
     */
    async fetchStatus (params = {}) {
        let type = undefined;
        [ type, params ] = this.handleMarketTypeAndParams ('fetchStatus', undefined, params);
        let response = undefined;
        if ((type !== 'spot') && (type !== 'margin')) {
            response = await this.publicGetFuturesOpenFapiV1Ping (params);
        } else {
            response = await this.publicGetSpotOpenSapiV1Ping (params);
        }
        // reutns an empty response if the exchange is alive, otherwise will trigger an error
        return {
            'status': 'ok',
            'updated': undefined,
            'eta': undefined,
            'url': undefined,
            'info': response,
        };
    }

    /**
     * @method
     * @name bitbaby#fetchTime
     * @description fetches the current integer timestamp in milliseconds from the exchange server
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/xian-huo-jiao-yi#fu-wu-qi-shi-jian
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/he-yue-jiao-yi#huo-qu-fu-wu-qi-shi-jian
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {int} the current integer timestamp in milliseconds from the exchange server
     */
    async fetchTime (params = {}): Promise<Int> {
        let type = undefined;
        [ type, params ] = this.handleMarketTypeAndParams ('fetchTime', undefined, params);
        let response = undefined;
        if ((type !== 'spot') && (type !== 'margin')) {
            response = await this.publicGetFuturesOpenFapiV1Time (params);
        } else {
            response = await this.publicGetSpotOpenSapiV1Time (params);
        }
        //
        //     {
        //         "timezone": "格林尼治标准时间",
        //         "serverTime": 1775118113716
        //     }
        //
        return this.safeInteger (response, 'serverTime');
    }

    /**
     * @method
     * @name bitbaby#fetchMarkets
     * @description retrieves data on all markets for exchagne
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/xian-huo-jiao-yi#bi-dui-lie-biao
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/he-yue-jiao-yi#he-yue-lie-biao
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} an array of objects representing market data
     */
    async fetchMarkets (params = {}): Promise<Market[]> {
        const promises = [
            this.publicGetSpotOpenSapiV1Symbols (params),
            this.publicGetFuturesOpenFapiV1Contracts (params),
        ];
        const [ spotResponse, contractResponse ] = await Promise.all (promises);
        const spotArray = this.safeList (spotResponse, 'symbols', []);
        let contractArray = [];
        if (Array.isArray (contractResponse)) {
            contractArray = contractResponse;
        }
        const result = this.arrayConcat (spotArray, contractArray);
        return this.parseMarkets (result);
    }

    parseMarket (market: Dict): Market {
        //
        // spot
        //     {
        //         "quantityPrecision": 5,
        //         "limitVolumeMin": 0.0000100000000000,
        //         "symbol": "btcusdt",
        //         "pricePrecision": 2,
        //         "marketBuyMin": 5.0000000000000000,
        //         "marketSellMin": 0.0000100000000000,
        //         "baseAsset": "BTC",
        //         "limitPriceMin": 0.0000100000000000,
        //         "quoteAsset": "USDT"
        //     }
        //
        // contract
        //     {
        //         "symbol": "E-ETH-USDT",
        //         "pricePrecision": 2,
        //         "side": 1,
        //         "maxMarketVolume": 20000,
        //         "multiplier": 0.0100000000000000,
        //         "minOrderVolume": 1,
        //         "maxMarketMoney": 10000000.0000000000000000,
        //         "type": "E",
        //         "maxLimitVolume": 20000,
        //         "maxValidOrder": 50,
        //         "multiplierCoin": "ETH",
        //         "minOrderMoney": 1.0000000000000000,
        //         "maxLimitMoney": 10000000.0000000000000000,
        //         "contractId": 2,
        //         "status": 1
        //     }
        //
        const id = this.safeString (market, 'symbol');
        let baseId = this.safeString (market, 'baseAsset');
        let quoteId = this.safeString (market, 'quoteAsset');
        let settleId = undefined;
        let isLinear = undefined;
        let isInverse = undefined;
        let isSpot = true;
        let isActive = true; // check for spot
        let fees = this.safeDict (this.fees, 'spot', {});
        if (baseId === undefined || quoteId === undefined) { // swap markets
            fees = this.safeDict (this.fees, 'contract', {});
            isSpot = false;
            const status = this.safeInteger (market, 'status');
            isActive = (status === 1);
            const symbolParts = id.split ('-');
            baseId = this.safeString (symbolParts, 1);
            quoteId = this.safeString (symbolParts, 2);
            const side = this.safeInteger (market, 'side');
            if (side === 0) {
                isInverse = true;
                isLinear = false;
                settleId = baseId;
            } else {
                isInverse = false;
                isLinear = true;
                settleId = quoteId;
            }
        }
        const base = this.safeCurrencyCode (baseId);
        const quote = this.safeCurrencyCode (quoteId);
        const settle = this.safeCurrencyCode (settleId);
        let symbol = base + '/' + quote;
        let maxAmount = undefined;
        let maxCost = undefined;
        if (!isSpot) {
            symbol += ':' + settle;
            const maxMarketVolume = this.safeString (market, 'maxMarketVolume');
            const maxLimitVolume = this.safeString (market, 'maxLimitVolume');
            maxAmount = this.parseNumber (Precise.stringMax (maxMarketVolume, maxLimitVolume));
            const maxMarketMoney = this.safeString (market, 'maxMarketMoney');
            const maxLimitMoney = this.safeString (market, 'maxLimitMoney');
            maxCost = this.parseNumber (Precise.stringMax (maxMarketMoney, maxLimitMoney));
        }
        const pricePrecision = this.parsePrecision (this.safeString (market, 'pricePrecision'));
        const amountPrecision = this.parsePrecision (this.safeString (market, 'quantityPrecision', '0')); // contracts are integers todo:check
        return this.safeMarketStructure ({
            'id': id,
            'numericId': this.safeInteger (market, 'contractId'),
            'symbol': symbol,
            'base': base,
            'quote': quote,
            'settle': settle,
            'baseId': baseId,
            'quoteId': quoteId,
            'settleId': settleId,
            'type': isSpot ? 'spot' : 'swap', // todo check for other types
            'spot': isSpot,
            'margin': isSpot, // todo check if margin is available for all markets
            'swap': !isSpot,
            'future': false,
            'option': false,
            'active': isActive,
            'contract': !isSpot,
            'linear': isLinear,
            'inverse': isInverse,
            'taker': this.safeNumber (fees, 'taker'),
            'maker': this.safeNumber (fees, 'maker'),
            'feeSide': this.safeString (fees, 'feeSide'),
            'contractSize': this.safeNumber (market, 'multiplier'),
            'expiry': undefined,
            'expiryDatetime': undefined,
            'strike': undefined,
            'optionType': undefined,
            'precision': {
                'amount': amountPrecision,
                'price': pricePrecision,
            },
            'limits': {
                'leverage': {
                    'min': undefined,
                    'max': undefined,
                },
                'amount': {
                    'min': this.safeNumber2 (market, 'limitVolumeMin', 'minOrderVolume'),
                    'max': maxAmount,
                },
                'price': {
                    'min': this.safeNumber (market, 'limitPriceMin'),
                    'max': undefined,
                },
                'cost': {
                    'min': this.safeNumber2 (market, 'marketBuyMin', 'minOrderMoney'),
                    'max': maxCost,
                },
            },
            'created': undefined,
            'info': market,
        });
    }

    /**
     * @method
     * @name bitbaby#fetchOrderBook
     * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/xian-huo-jiao-yi#ding-dan-bo
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/he-yue-jiao-yi#ding-dan-bo
     * @param {string} symbol unified symbol of the market to fetch the order book for
     * @param {int} [limit] the maximum amount of order book entries to return (default 30, max 100)
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/?id=order-book-structure} indexed by market symbols
     */
    async fetchOrderBook (symbol: string, limit: Int = undefined, params = {}): Promise<OrderBook> {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request: Dict = {};
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        let response = undefined;
        if (market['contract']) {
            request['contractName'] = market['id'];
            //
            //     {
            //         "asks": [
            //             [
            //                 "2034.59",
            //                 "46",
            //                 "46",
            //                 "93591.14"
            //             ]
            //         ],
            //         "bids": [
            //             [
            //                 "2034.55",
            //                 "294",
            //                 "294",
            //                 "598157.70" // cumulative cost
            //             ]
            //         ],
            //         "time": null
            //     }
            response = await this.publicGetFuturesOpenFapiV1Depth (this.extend (request, params));
        } else {
            request['symbol'] = market['id'];
            //
            //     {
            //         "asks": [
            //             [
            //                 "2036.17",
            //                 "9.058",
            //                 "9.058"
            //             ]
            //         ],
            //         "bids": [
            //             [
            //                 "2036.16",
            //                 "5.698",
            //                 "5.698" // cumulative amount
            //             ]
            //         ],
            //         "time": 1775124840450
            //     }
            //
            response = await this.publicGetSpotOpenSapiV1Depth (this.extend (request, params));
        }
        // do not use standard parseOrderBook helper to avoid additional values in the arrays
        const rawBids = this.safeList (response, 'bids', []);
        const rawAsks = this.safeList (response, 'asks', []);
        const bids = [];
        const asks = [];
        for (let i = 0; i < rawBids.length; i++) {
            const bid = this.safeList (rawBids, i, []);
            const parsedBid = [];
            const price = this.safeNumber (bid, 0);
            const amount = this.safeNumber (bid, 1);
            parsedBid.push (price);
            parsedBid.push (amount);
            bids.push (parsedBid);
        }
        for (let i = 0; i < rawAsks.length; i++) {
            const ask = this.safeList (rawAsks, i, []);
            const parsedAsk = [];
            const price = this.safeNumber (ask, 0);
            const amount = this.safeNumber (ask, 1);
            parsedAsk.push (price);
            parsedAsk.push (amount);
            asks.push (parsedAsk);
        }
        const timestamp = this.safeInteger (response, 'time');
        return {
            'symbol': symbol,
            'bids': this.sortBy (bids, 0, true),
            'asks': this.sortBy (asks, 0),
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'nonce': undefined,
        } as OrderBook;
    }

    /**
     * @method
     * @name bitbaby#fetchTicker
     * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/xian-huo-jiao-yi#hang-qing-ticker
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/he-yue-jiao-yi#hang-qing-ticker
     * @param {string} symbol unified symbol of the market to fetch the ticker for
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/?id=ticker-structure}
     */
    async fetchTicker (symbol: string, params = {}): Promise<Ticker> {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request: Dict = {};
        let response = undefined;
        if (market['contract']) {
            request['contractName'] = market['id'];
            //
            //     {
            //         "high": "69146",
            //         "vol": "72503850",
            //         "last": "66299.5",
            //         "low": "66121.8",
            //         "buy": "66300.0",
            //         "sell": "66300.1",
            //         "rose": "-3.3354620104",
            //         "time": 1775130047000
            //     }
            //
            response = await this.publicGetFuturesOpenFapiV1Ticker (this.extend (request, params));
        } else {
            request['symbol'] = market['id'];
            //
            //     {
            //         "amount": "31908898.5497543",
            //         "high": "69159.98",
            //         "vol": "472.36167",
            //         "last": 66345.1300000000000000,
            //         "low": "66168",
            //         "buy": "66350.15",
            //         "sell": "66350.16",
            //         "rose": "-3.311281538",
            //         "time": 1775130100000
            //     }
            //
            response = await this.publicGetSpotOpenSapiV1Ticker (this.extend (request, params));
        }
        return this.parseTicker (response, market);
    }

    parseTicker (ticker: Dict, market: Market = undefined): Ticker {
        //
        // spot
        //     {
        //         "amount": "31908898.5497543",
        //         "high": "69159.98",
        //         "vol": "472.36167",
        //         "last": 66345.1300000000000000,
        //         "low": "66168",
        //         "buy": "66350.15",
        //         "sell": "66350.16",
        //         "rose": "-3.311281538",
        //         "time": 1775130100000
        //     }
        //
        // swap
        //     {
        //         "high": "69146",
        //         "vol": "72503850",
        //         "last": "66299.5",
        //         "low": "66121.8",
        //         "buy": "66300.0",
        //         "sell": "66300.1",
        //         "rose": "-3.3354620104",
        //         "time": 1775130047000
        //     }
        //
        const marketId = this.safeString (ticker, 'contractName');
        market = this.safeMarket (marketId, market);
        const timestamp = this.safeInteger (ticker, 'time');
        return this.safeTicker ({
            'symbol': market['symbol'],
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'high': this.safeString (ticker, 'high'),
            'low': this.safeString (ticker, 'low'),
            'bid': this.safeString (ticker, 'buy'),
            'bidVolume': undefined,
            'ask': this.safeString (ticker, 'sell'),
            'askVolume': undefined,
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'last': this.safeString (ticker, 'last'),
            'previousClose': undefined,
            'change': undefined,
            'percentage': this.safeString (ticker, 'rose'),
            'average': undefined,
            'baseVolume': this.safeString (ticker, 'vol'),
            'quoteVolume': this.safeString (ticker, 'amount'),
            'markPrice': this.safeString (ticker, 'markPrice'),
            'indexPrice': this.safeString (ticker, 'indexPrice'),
            'info': ticker,
        }, market);
    }

    /**
     * @method
     * @name bitbaby#fetchFundingRate
     * @description fetch the current funding rate
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/he-yue-jiao-yi#huo-qu-zhi-shu-biao-ji-jia-ge
     * @param {string} symbol unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [funding rate structure]{@link https://docs.ccxt.com/#/?id=funding-rate-structure}
     */
    async fetchFundingRate (symbol: string, params = {}): Promise<FundingRate> {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request: Dict = {
            'contractName': market['id'],
        };
        if (market['spot']) {
            throw new NotSupported (this.id + ' fetchFundingRate() is not supported for spot markets');
        }
        const response = await this.publicGetFuturesOpenFapiV1Index (this.extend (request, params));
        return this.parseFundingRate (response, market);
    }

    parseFundingRate (contract, market: Market = undefined): FundingRate {
        //
        //     {
        //         "currentFundRate": 0.00003,
        //         "indexPrice": 66178.765,
        //         "tagPrice": 66142.4,
        //         "nextFundRate": -0.0000703671478945
        //     }
        //
        return {
            'info': contract,
            'symbol': market['symbol'],
            'markPrice': this.safeNumber (contract, 'tagPrice'), // todo check if this is correct
            'indexPrice': this.safeNumber (contract, 'indexPrice'),
            'interestRate': undefined,
            'estimatedSettlePrice': undefined,
            'timestamp': undefined,
            'datetime': undefined,
            'fundingRate': this.safeNumber (contract, 'currentFundRate'),
            'fundingTimestamp': undefined,
            'fundingDatetime': undefined,
            'nextFundingRate': this.safeNumber (contract, 'nextFundRate'),
            'nextFundingTimestamp': undefined,
            'nextFundingDatetime': undefined,
            'previousFundingRate': undefined,
            'previousFundingTimestamp': undefined,
            'previousFundingDatetime': undefined,
            'interval': undefined,
        } as FundingRate;
    }

    /**
     * @method
     * @name bitbaby#fetchOHLCV
     * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/xian-huo-jiao-yi#k-xian-la-zhu-tu-shu-ju
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/he-yue-jiao-yi#k-xian-la-zhu-tu-shu-ju
     * @param {string} symbol unified symbol of the market to fetch OHLCV data for
     * @param {string} timeframe the length of time each candle represents
     * @param {int} [since] timestamp in ms of the earliest candle to fetch
     * @param {int} [limit] the maximum amount of candles to fetch (default 100, max 300)
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
     */
    async fetchOHLCV (symbol: string, timeframe: string = '1m', since: Int = undefined, limit: Int = undefined, params = {}): Promise<OHLCV[]> {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const interval = this.safeString (this.timeframes, timeframe, timeframe);
        const request: Dict = {
            'interval': interval,
        };
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        let response = undefined;
        if (market['contract']) {
            request['contractName'] = market['id'];
            response = await this.publicGetFuturesOpenFapiV1Klines (this.extend (request, params));
        } else {
            request['symbol'] = market['id'];
            response = await this.publicGetSpotOpenSapiV1Klines (this.extend (request, params));
        }
        // returns an empty array
        // todo check in private api
        return this.parseOHLCVs (response, market, timeframe, since, limit);
    }

    parseOHLCV (ohlcv, market: Market = undefined): OHLCV {
        // example from docs
        //
        //     {
        //         "high": "6228.77",
        //         "vol": "111",
        //         "low": "6228.77",
        //         "idx": 1594640340,
        //         "close": "6228.77",
        //         "open": "6228.77"
        //     }
        //
        return [
            this.safeInteger (ohlcv, 'idx'),
            this.safeNumber (ohlcv, 'open'),
            this.safeNumber (ohlcv, 'high'),
            this.safeNumber (ohlcv, 'low'),
            this.safeNumber (ohlcv, 'close'),
            this.safeNumber (ohlcv, 'vol'),
        ];
    }

    /**
     * @method
     * @name kucoin#fetchTrades
     * @description get the list of most recent trades for a particular symbol
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/xian-huo-jiao-yi#zui-jin-cheng-jiao
     * @param {string} symbol unified symbol of the market to fetch trades for
     * @param {int} [since] timestamp in ms of the earliest trade to fetch
     * @param {int} [limit] the maximum amount of trades to fetch (default 200)
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/?id=public-trades}
     */
    async fetchTrades (symbol: string, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Trade[]> {
        await this.loadMarkets ();
        const market = this.market (symbol);
        if (market['contract']) {
            throw new NotSupported (this.id + ' fetchTrades() is not supported for contract markets');
        }
        const request: Dict = {
            'symbol': market['id'],
        };
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const response = await this.publicGetSpotOpenSapiV1Trades (this.extend (request, params));
        //
        //     [
        //         {
        //             "side": "sell",
        //             "price": 66316.5900000000000000,
        //             "qty": 0.0000700000000000,
        //             "time": 1775140259281
        //         }
        //     ]
        //
        return this.parseTrades (response, market, since, limit);
    }

    parseTrade (trade: Dict, market: Market = undefined): Trade {
        //
        // fetchTrades
        //     {
        //         "side": "sell",
        //         "price": 66316.5900000000000000,
        //         "qty": 0.0000700000000000,
        //         "time": 1775140259281
        //     }
        //
        const timestamp = this.safeInteger (trade, 'time');
        return this.safeTrade ({
            'info': trade,
            'id': undefined,
            'order': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'takerOrMaker': undefined,
            'side': this.safeStringLower (trade, 'side'),
            'price': this.safeString (trade, 'price'),
            'amount': this.safeString (trade, 'qty'),
            'cost': undefined,
            'fee': undefined,
        }, market);
    }

    sign (path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        const endpoint = this.implodeParams (path, params);
        const query = this.omit (params, this.extractParams (path));
        let url = this.urls['api'][api] + '/' + endpoint;
        if (method === 'GET') {
            if (Object.keys (query).length) {
                url += '?' + this.urlencode (query);
            }
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }
}
