
//  ---------------------------------------------------------------------------

import Exchange from './abstract/bitbaby.js';
// import { AccountSuspended, ArgumentsRequired, AuthenticationError, BadRequest, BadSymbol, ExchangeError, ExchangeNotAvailable, InsufficientFunds, InvalidAddress, InvalidNonce, InvalidOrder, NotSupported, OrderNotFound, PermissionDenied, RateLimitExceeded, RestrictedLocation } from './base/errors.js';
import { Precise } from './base/Precise.js';
import { TICK_SIZE } from './base/functions/number.js';
// import { sha256 } from './static_dependencies/noble-hashes/sha256.js';
import type { Dict, IndexType, Int, Market, OrderBook } from './base/types.js';

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
                'fetchFundingRate': false,
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
                        'spot/open/sapi/v1/ticker': 1,
                        'spot/open/sapi/v1/trades': 1,
                        'spot/open/sapi/v1/klines': 1,
                        'futures/open/fapi/v1/ping': 1, // done check rate limit
                        'futures/open/fapi/v1/time': 1, // done check rate limit
                        'futures/open/fapi/v1/contracts': 1, // done check rate limit
                        'futures/open/fapi/v1/depth': 1, // done check rate limit
                        'futures/open/fapi/v1/ticker': 1,
                        'futures/open/fapi/v1/index': 1,
                        'futures/open/fapi/v1/klines': 1,
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
        const timestamp = this.safeInteger (response, 'time');
        return this.parseOrderBook (response, symbol, timestamp);
    }

    parseBidAsk (bidask, priceKey: IndexType = 0, amountKey: IndexType = 1, countOrIdKey: IndexType = 2) {
        const price = this.safeFloat (bidask, priceKey);
        const amount = this.safeFloat (bidask, amountKey);
        const bidAsk = [ price, amount ];
        return bidAsk;
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
