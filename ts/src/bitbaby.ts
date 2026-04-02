
//  ---------------------------------------------------------------------------

import Exchange from './abstract/bitbaby.js';
import { ArgumentsRequired, BadRequest, InvalidOrder, NotSupported } from './base/errors.js';
import { Precise } from './base/Precise.js';
import { TICK_SIZE } from './base/functions/number.js';
import { sha256 } from './static_dependencies/noble-hashes/sha256.js';
import type { Balances, Dict, FundingRate, Int, Market, Num, OHLCV, Order, OrderBook, OrderRequest, OrderSide, OrderType, Str, Ticker, Trade } from './base/types.js';

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
            'rateLimit': 20,
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
                'cancelOrders': true, // spot non-margin only
                'cancelOrdersWithClientOrderId': false,
                'cancelOrderWithClientOrderId': false,
                'closeAllPositions': false,
                'closePosition': false,
                'createDepositAddress': false,
                'createLimitBuyOrder': true,
                'createLimitOrder': true,
                'createLimitSellOrder': true,
                'createMarketBuyOrder': true,
                'createMarketBuyOrderWithCost': true,
                'createMarketOrder': true,
                'createMarketOrderWithCost': false,
                'createMarketSellOrder': true,
                'createMarketSellOrderWithCost': false,
                'createOrder': true,
                'createOrders': true, // spot non-margin only
                'createOrderWithTakeProfitAndStopLoss': false,
                'createPostOnlyOrder': true, // contract only
                'createReduceOnlyOrder': true,
                'createStopLimitOrder': false,
                'createStopLossOrder': true,
                'createTakeProfitOrder': true,
                'createTrailingAmountOrder': false,
                'createTrailingPercentOrder': false,
                'createTriggerOrder': true,
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
                'fetchMyTrades': true,
                'fetchOHLCV': false,
                'fetchOpenInterest': false,
                'fetchOpenInterestHistory': false,
                'fetchOpenInterests': false,
                'fetchOpenOrder': false,
                'fetchOpenOrders': true,
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
                        'spot/open/sapi/v1/order': 5, // done
                        'spot/open/sapi/v1/openOrders': 5, // done
                        'spot/open/sapi/v1/myTrades': 5, // done
                        'spot/open/sapi/v1/account': 5, // done
                        'spot/open/sapi/v1/margin/order': 5, // todo check rate limit and response
                        'spot/open/sapi/v1/margin/openOrders': 5, // todo check rate limit and response
                        'spot/open/sapi/v1/margin/myTrades': 1, // todo check rate limit and response
                        'futures/open/fapi/v1/order': 5, // todo check rate limit and response
                        'futures/open/fapi/v1/openOrders': 5, // todo check rate limit and response
                        'futures/open/fapi/v1/myTrades': 1, // todo check rate limit and response
                        'futures/open/fapi/v1/account': 1, // todo check rate limit and response
                    },
                    'post': {
                        'spot/open/sapi/v1/order': 1, // done
                        'spot/open/sapi/v1/order/test': 1, // done
                        'spot/open/sapi/v1/batchOrders': 2, // done
                        'spot/open/sapi/v1/cancel': 1, // done
                        'spot/open/sapi/v1/batchCancel': 2, // done
                        'spot/open/sapi/v1/margin/order': 5, // done
                        'spot/open/sapi/v1/margin/cancel': 1, // todo check rate limit and response
                        'futures/open/fapi/v1/order': 1, // todo - check
                        'futures/open/fapi/v1/conditionOrder': 1, // todo - check
                        'futures/open/fapi/v1/cancel': 1, // todo check rate limit and response
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
                    // {"code":"110047","msg":"价格或金额小于最小值","data":null}
                    // {"code":"-1000","msg":"处理请求时发生未知错误","data":null}
                    // { code: '-2100', msg: '参数问题', data: null }
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
                'createMarketBuyOrderRequiresPrice': true,
                'accountsByType': {
                },
                'networks': {
                },
            },
            'features': {
                'spot': {
                    'sandbox': false,
                    'createOrder': {
                        'marginMode': false,
                        'margin': true,
                        'triggerPrice': false,
                        'triggerPriceType': undefined,
                        'triggerDirection': undefined,
                        'stopLossPrice': false,
                        'takeProfitPrice': false,
                        'attachedStopLossTakeProfit': undefined,
                        'timeInForce': {
                            'IOC': false,
                            'FOK': false,
                            'PO': false,
                            'GTD': false,
                        },
                        'hedged': false,
                        'trailing': false,
                        'leverage': false,
                        'marketBuyByCost': false,
                        'marketBuyRequiresPrice': false,
                        'selfTradePrevention': false,
                        'iceberg': false,
                    },
                    'createOrders': {
                        'max': 10,
                    },
                    'fetchMyTrades': {
                        'marginMode': true,
                        'limit': undefined,
                        'daysBack': undefined,
                        'untilDays': 7, // per  implementation comments
                        'symbolRequired': true,
                    },
                    'fetchOrder': {
                        'margin': true,
                        'marginMode': false,
                        'trigger': false,
                        'trailing': false,
                        'symbolRequired': true,
                    },
                    'fetchOpenOrders': {
                        'margin': true,
                        'marginMode': false,
                        'limit': 1000,
                        'trigger': false,
                        'trailing': false,
                        'symbolRequired': true,
                    },
                    'fetchOrders': undefined,
                    'fetchClosedOrders': undefined,
                    'fetchOHLCV': {
                        'limit': 1000,
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
        if (this.options['adjustForTimeDifference']) {
            await this.loadTimeDifference ();
        }
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
     * @name bitbaby#fetchTrades
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
        // fetchMyTrades spot
        //     {
        //         "symbol": "DOGEUSDT",
        //         "side": "BUY",
        //         "fee": "0.4652193",
        //         "isMaker": false,
        //         "isBuyer": true,
        //         "bidId": 3206077345740844498,
        //         "bidUserId": 1047121,
        //         "feeCoin": "DOGE",
        //         "price": "0.09028",
        //         "qty": "232.60965",
        //         "askId": 3176911270805052610,
        //         "id": "6137967",
        //         "time": 1775161045250,
        //         "isSelf": false,
        //         "askUserId": 1000048
        //     }
        //
        const marketId = this.safeString (trade, 'symbol');
        market = this.safeMarket (marketId, market);
        const timestamp = this.safeInteger (trade, 'time');
        let side = this.safeStringLower (trade, 'side');
        if (side === undefined) {
            const isBuyer = this.safeBool (trade, 'isBuyer', false);
            side = isBuyer ? 'buy' : 'sell';
        }
        let orderIdKey = 'bidId';
        if (side === 'sell') {
            orderIdKey = 'askId';
        }
        let takerOrMaker = undefined;
        const isMaker = this.safeBool (trade, 'isMaker');
        if (isMaker !== undefined) {
            takerOrMaker = isMaker ? 'maker' : 'taker';
        }
        return this.safeTrade ({
            'info': trade,
            'id': this.safeString (trade, 'id'),
            'order': this.safeString (trade, orderIdKey),
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'takerOrMaker': takerOrMaker,
            'side': side,
            'price': this.safeString (trade, 'price'),
            'amount': this.safeString (trade, 'qty'),
            'cost': undefined,
            'fee': undefined,
        }, market);
    }

    /**
     * @method
     * @name bitbaby#createOrder
     * @description Create an order on the exchange
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/xian-huo-jiao-yi#chuang-jian-xin-ding-dan // spot
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/xian-huo-jiao-yi#chuang-jian-ce-shi-ding-dan // spot test
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/gang-gan-jiao-yi#chuang-jian-gang-gan-ding-dan // margin
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/he-yue-jiao-yi#chuang-jian-ding-dan // contract
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/he-yue-jiao-yi#chuang-jian-tiao-jian-dan // contract trigger
     * @param {string} symbol Unified CCXT market symbol
     * @param {string} type 'limit' or 'market'
     * @param {string} side 'buy' or 'sell'
     * @param {float} amount the amount of currency to trade
     * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
     * @param {object} [params]  extra parameters specific to the exchange API endpoint
     * Check createSpotOrder() and createContractOrder() for more details on the extra parameters that can be used in params
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/?id=order-structure}
     */
    async createOrder (symbol: string, type: OrderType, side: OrderSide, amount: number, price: Num = undefined, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const test = this.safeBool (params, 'test', false);
        if (market['contract']) {
            if (test) {
                throw new NotSupported (this.id + ' createOrder() does not support test orders for contract markets');
            }
            return await this.createContractOrder (symbol, type, side, amount, price, params);
        } else {
            return await this.createSpotOrder (symbol, type, side, amount, price, params);
        }
    }

    /**
     * @method
     * @name bitbaby#createSpotOrder
     * @description helper method for creating spot orders
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/xian-huo-jiao-yi#chuang-jian-xin-ding-dan // spot
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/xian-huo-jiao-yi#chuang-jian-ce-shi-ding-dan // spot test
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/gang-gan-jiao-yi#chuang-jian-gang-gan-ding-dan // margin
     * @param {string} symbol Unified CCXT market symbol
     * @param {string} type 'limit' or 'market'
     * @param {string} side 'buy' or 'sell'
     * @param {float} amount the amount of currency to trade
     * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
     * @param {object} [params]  extra parameters specific to the exchange API endpoint
     * @param {string} [params.clientOrderId] client order id
     * @param {bool} [params.margin] whether to create a margin order, default is false (spot order)
     * @param {int} [params.recvWindow] request valid time window value
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/?id=order-structure}
     */
    async createSpotOrder (symbol: string, type: OrderType, side: OrderSide, amount: number, price: Num = undefined, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = this.createSpotOrderRequest (symbol, type, side, amount, price, params);
        const test = this.safeBool (params, 'test', false);
        let margin = false;
        [ margin, params ] = this.handleOptionAndParams (params, 'createOrder', 'margin', margin);
        let response = undefined;
        if (margin && test) {
            throw new NotSupported (this.id + ' createOrder() does not support test orders with margin');
        }
        if (test) {
            //
            // {} - empty response if no error
            //
            params = this.omit (params, 'test');
            response = await this.privatePostSpotOpenSapiV1OrderTest (this.extend (request, params));
        } else if (margin) {
            // todo check margin order
            //
            response = await this.privatePostSpotOpenSapiV1MarginOrder (this.extend (request, params));
        } else {
            //
            //     {
            //         "symbol": "dogeusdt",
            //         "newClientOrderId": null,
            //         "side": "BUY",
            //         "executedQty": 0,
            //         "orderId": [
            //             "3176901856236716480"
            //         ],
            //         "price": 0,
            //         "origQty": 20,
            //         "clientOrderId": null,
            //         "transactTime": 1775144786145,
            //         "type": "MARKET",
            //         "status": "NEW"
            //     }
            //
            response = await this.privatePostSpotOpenSapiV1Order (this.extend (request, params));
        }
        return this.parseOrder (response, market);
    }

    createSpotOrderRequest (symbol: string, type: OrderType, side: OrderSide, amount: number, price: Num = undefined, params = {}) {
        const market = this.market (symbol);
        const request: Dict = {
            'symbol': market['id'],
            'side': side.toUpperCase (),
            'type': type.toUpperCase (),
            // 'volume': this.amountToPrecision (symbol, amount),
        };
        const isMarketOrder = (type === 'market');
        if (isMarketOrder) {
            if (side === 'buy') {
                let createMarketBuyOrderRequiresPrice = true;
                [ createMarketBuyOrderRequiresPrice, params ] = this.handleOptionAndParams (params, 'createOrder', 'createMarketBuyOrderRequiresPrice', true);
                const cost = this.safeString (params, 'cost');
                params = this.omit (params, 'cost');
                if (createMarketBuyOrderRequiresPrice) {
                    if ((price === undefined) && (cost === undefined)) {
                        throw new InvalidOrder (this.id + ' createOrder() requires the price argument for market buy orders to calculate the total cost to spend (amount * price), alternatively set the createMarketBuyOrderRequiresPrice option or param to false and pass the cost to spend in the amount argument');
                    } else {
                        const amountString = this.numberToString (amount);
                        const priceString = this.numberToString (price);
                        const quoteAmount = this.parseToNumeric (Precise.stringMul (amountString, priceString));
                        const costRequest = (cost !== undefined) ? cost : quoteAmount;
                        request['volume'] = this.costToPrecision (symbol, costRequest);
                    }
                } else {
                    request['volume'] = this.costToPrecision (symbol, amount);
                }
            } else {
                request['volume'] = this.amountToPrecision (symbol, amount);
            }
        } else {
            request['volume'] = this.amountToPrecision (symbol, amount);
            request['price'] = this.priceToPrecision (symbol, price);
        }
        const clientOrderId = this.safeString (params, 'clientOrderId');
        if (clientOrderId !== undefined) {
            request['newClientOrderId'] = clientOrderId;
            params = this.omit (params, 'clientOrderId');
        }
        let recwWindow = undefined;
        [ recwWindow, params ] = this.handleOptionAndParams (params, 'createOrder', 'recvWindow'); // checking both options and params for recvWindow value
        if (recwWindow !== undefined) {
            request['recvWindow'] = recwWindow;
        }
        return this.extend (request, params);
    }

    /**
     * @method
     * @name bitbaby#createContractOrder
     * @description helper method for creating contract orders
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/he-yue-jiao-yi#chuang-jian-ding-dan // contract
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/he-yue-jiao-yi#chuang-jian-tiao-jian-dan // contract trigger
     * @param {string} symbol Unified CCXT market symbol
     * @param {string} type 'limit' or 'market'
     * @param {string} side 'buy' or 'sell'
     * @param {float} amount the amount of currency to trade
     * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
     * @param {object} [params]  extra parameters specific to the exchange API endpoint
     * @param {float} [params.triggerPrice] trigger price for conditional orders
     * @param {float} [params.stopLossPrice] stop loss price for the order
     * @param {float} [params.takeProfitPrice] take profit price for the order
     * @param {string} [params.clientOrderId] client order id
     * @param {bool} [params.reduceOnly] whether the order is reduce only, default is false
     * @param {string} [params.marginMode] 'cross' or 'isolated', default is 'cross'
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/?id=order-structure}
     */
    async createContractOrder (symbol: string, type: OrderType, side: OrderSide, amount: number, price: Num = undefined, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = this.createContractOrderRequest (symbol, type, side, amount, price, params);
        const triggerPrice = this.safeString (params, 'triggerPrice');
        let response = undefined;
        if (triggerPrice === undefined) {
            // regular order
            response = await this.privatePostFuturesOpenFapiV1Order (this.extend (request, params));
        } else {
            // conditional order
            response = await this.privatePostFuturesOpenFapiV1ConditionOrder (this.extend (request, params));
        }
        return this.parseOrder (response, market);
    }

    createContractOrderRequest (symbol: string, type: OrderType, side: OrderSide, amount: number, price: Num = undefined, params = {}) {
        const market = this.market (symbol);
        const request: Dict = {
            'contractName': market['id'],
            'side': side.toUpperCase (),
            'type': type.toUpperCase (),
            'volume': this.amountToPrecision (symbol, amount),
        };
        if (type === 'limit') {
            request['price'] = this.priceToPrecision (symbol, price);
        }
        let marginMode = 'cross';
        [ marginMode, params ] = this.handleMarginModeAndParams ('createOrder', params, marginMode);
        if (marginMode !== undefined) {
            request['positionType'] = this.encodeMarginMode (marginMode);
        }
        let openOrClose = 'OPEN';
        const reduceOnly = this.safeBool (params, 'reduceOnly', false);
        if (reduceOnly) {
            params = this.omit (params, 'reduceOnly');
            openOrClose = 'CLOSE';
        }
        request['open'] = openOrClose;
        const [ triggerPrice, stopLossPrice, takeProfitPrice, query ] = this.handleTriggerPricesAndParams (symbol, params);
        if (triggerPrice !== undefined) {
            if ((stopLossPrice !== undefined) || (takeProfitPrice !== undefined)) {
                throw new NotSupported (this.id + ' createContractOrder() supports only one parameter among triggerPrice, stopLossPrice and takeProfitPrice');
            }
            request['triggerPrice'] = triggerPrice;
            const triggerType = (side === 'buy') ? 3 : 4;
            request['triggerType'] = triggerType;
        }
        if (stopLossPrice !== undefined) {
            if ((triggerPrice !== undefined) || (takeProfitPrice !== undefined)) {
                throw new NotSupported (this.id + ' createContractOrder() supports only one parameter among triggerPrice, stopLossPrice and takeProfitPrice');
            }
            request['triggerPrice'] = stopLossPrice;
            request['triggerType'] = 1;
        } else if (takeProfitPrice !== undefined) {
            request['triggerPrice'] = takeProfitPrice;
            request['triggerType'] = 2;
        }
        return this.extend (request, query);
    }

    encodeMarginMode (marginMode) {
        const modes = {
            'cross': 1,
            'isolated': 2,
        };
        return this.safeInteger (modes, marginMode, marginMode);
    }

    /**
     * @method
     * @name bitbaby#createOrders
     * @description create a list of trade spot orders
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/xian-huo-jiao-yi#pi-liang-xia-dan // spot
     * @param {Array} orders list of orders to create, each object should contain the parameters required by createOrder, namely symbol, type, side, amount, price and params
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createOrders (orders: OrderRequest[], params = {}) {
        await this.loadMarkets ();
        const ordersRequests = [];
        const length = orders.length;
        if (length > 10) {
            throw new BadRequest (this.id + ' createOrders() can only create up to 10 orders at a time');
        }
        const firstOrder = this.safeDict (orders, 0);
        const firstSymbol = this.safeString (firstOrder, 'symbol');
        const firstMarket = this.market (firstSymbol);
        const symbol = firstMarket['symbol'];
        for (let i = 0; i < orders.length; i++) {
            const order = this.safeDict (orders, i);
            const orderSymbol = this.safeString (order, 'symbol');
            const market = this.market (orderSymbol);
            if (!market['spot']) {
                throw new NotSupported (this.id + ' createOrders() only supports spot orders');
            }
            if (market['symbol'] !== symbol) {
                throw new BadRequest (this.id + ' createOrders() only supports orders with the same symbol');
            }
            const type = this.safeStringUpper (order, 'type');
            const side = this.safeStringUpper (order, 'side');
            const amount = this.safeString (order, 'amount');
            const price = this.safeString (order, 'price');
            const orderRequest: Dict = {
                'side': side,
                'batchType': type,
                'volume': this.parseNumber (this.amountToPrecision (symbol, amount)),
            };
            if (price !== undefined) {
                orderRequest['price'] = this.parseNumber (this.priceToPrecision (symbol, price));
            }
            ordersRequests.push (orderRequest);
        }
        const request: Dict = {
            'symbol': firstMarket['id'],
            'orders': ordersRequests,
        };
        const response = await this.privatePostSpotOpenSapiV1BatchOrders (this.extend (request, params));
        //
        //     {
        //         "ids": [
        //             "3176908865623394614",
        //             "3176908865623394615"
        //         ],
        //         "newClientOrderIds": [
        //             "",
        //             ""
        //         ]
        //     }
        //
        const ids = this.safeList (response, 'ids', []);
        const result = [];
        for (let i = 0; i < ids.length; i++) {
            const id = this.safeString (ids, i);
            const parsed = this.safeOrder ({
                'id': id,
                'symbol': firstMarket['symbol'],
                'info': response,
            });
            result.push (parsed);
        }
        return result;
    }

    /**
     * @method
     * @name bitbaby#fetchOrder
     * @description fetches information on an order made by the user
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/xian-huo-jiao-yi#ding-dan-cha-xun // spot
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/gang-gan-jiao-yi#gang-gan-ding-dan-cha-xun // margin
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/he-yue-jiao-yi#ding-dan-xiang-qing // contract
     * @param {string} id order id
     * @param {string} symbol unified symbol of the market the order was made in
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.clientOrderId] client order id, required if id is not provided
     * @param {bool} [params.margin] *spot markets only* whether to fetch a margin order, default is false (spot order)
     * @returns {object} An [order structure]{@link https://docs.ccxt.com/?id=order-structure}
     */
    async fetchOrder (id: Str, symbol: Str = undefined, params = {}) {
        await this.loadMarkets ();
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' fetchOrder() requires a symbol argument');
        }
        const market = this.market (symbol);
        const marketId = market['id'];
        const isContract = market['contract'];
        const request: Dict = {};
        const clientOrderId = this.safeString2 (params, 'clientOrderId', 'newClientOrderId');
        params = this.omit (params, [ 'clientOrderId', 'newClientOrderId' ]);
        if (clientOrderId === undefined) {
            if (id === undefined) {
                throw new ArgumentsRequired (this.id + ' fetchOrder() requires an id argument or a clientOrderId in params');
            } else {
                request['orderId'] = id;
            }
        } else if (isContract) {
            request['clientOrderId'] = clientOrderId;
        } else {
            request['newClientOrderId'] = clientOrderId; // todo check fetching by clientOrderId
        }
        let margin = false;
        [ margin, params ] = this.handleOptionAndParams (params, 'fetchOrder', 'margin', margin);
        let response = undefined;
        if (isContract) {
            request['contractName'] = marketId;
            response = await this.privateGetFuturesOpenFapiV1Order (this.extend (request, params));
        } else {
            request['symbol'] = marketId;
            if (margin) {
                response = await this.privateGetSpotOpenSapiV1MarginOrder (this.extend (request, params));
            } else {
                //
                //     {
                //         "symbol": "dogeusdt",
                //         "side": "BUY",
                //         "executedQty": 0E-16,
                //         "orderId": "3176908865623394614",
                //         "price": 0.0100000000000000,
                //         "origQty": 20.0000000000000000,
                //         "avgPrice": 0E-16,
                //         "transactTime": 1775156645000,
                //         "type": "LIMIT",
                //         "status": "New Order"
                //     }
                //
                response = await this.privateGetSpotOpenSapiV1Order (this.extend (request, params));
            }
        }
        return this.parseOrder (response, market);
    }

    /**
     * @method
     * @name bitbaby#fetchOpenOrders
     * @description fetch all unfilled currently open orders
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/xian-huo-jiao-yi#dang-qian-ding-dan // spot
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/gang-gan-jiao-yi#gang-gan-dang-qian-wei-tuo // margin
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/he-yue-jiao-yi#dang-qian-ding-dan // contract
     * @param {string} symbol unified market symbol of the market orders were made in
     * @param {int} [since] the earliest time in ms to fetch orders for
     * @param {int} [limit] the maximum number of order structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {bool} [params.margin] *spot markets only* whether to fetch a margin order, default is false (spot order)
     * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/?id=order-structure}
     */
    async fetchOpenOrders (symbol: Str = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Order[]> {
        await this.loadMarkets ();
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' fetchOpenOrders() requires a symbol argument');
        }
        const market = this.market (symbol);
        const marketId = market['id'];
        const isContract = market['contract'];
        const request: Dict = {};
        let margin = false;
        [ margin, params ] = this.handleOptionAndParams (params, 'fetchOpenOrders', 'margin', margin);
        let response = undefined;
        if (isContract) {
            request['contractName'] = marketId;
            //
            //     [
            //         {
            //             "side": "SELL",
            //             "clientId": "1_0.7_1775037590976_sell_s0p",
            //             "executedQty": 2189,
            //             "orderId": 3215386721681467793,
            //             "origQty": 46869.0000000000000000,
            //             "avgPrice": 0.09235000,
            //             "mergeSplitMode": 1,
            //             "type": "LIMIT",
            //             "positionId": 107154,
            //             "price": 0.0923500000000000,
            //             "transactTime": 1775037591000,
            //             "action": "OPEN",
            //             "contractName": "E-DOGE-USDT",
            //             "timeInForce": "POST_ONLY",
            //             "status": "PART_FILLED"
            //         }
            //     ]
            //
            response = await this.privateGetFuturesOpenFapiV1OpenOrders (this.extend (request, params));
        } else {
            request['symbol'] = marketId;
            if (limit !== undefined) {
                request['limit'] = limit;
            }
            if (margin) {
                response = await this.privateGetSpotOpenSapiV1MarginOpenOrders (this.extend (request, params));
            } else {
                //
                //     [
                //         {
                //             "symbol": "DOGEUSDT",
                //             "newClientOrderId": null,
                //             "side": "BUY",
                //             "executedQty": "0",
                //             "orderId": "3176908865623394614",
                //             "price": "0.01",
                //             "origQty": "20",
                //             "avgPrice": "0",
                //             "time": 1775156645000,
                //             "type": "LIMIT",
                //             "status": "New Order"
                //         }
                //     ]
                //
                response = await this.privateGetSpotOpenSapiV1OpenOrders (this.extend (request, params));
            }
        }
        return this.parseOrders (response, market, since, limit);
    }

    /**
     * @method
     * @name bitbaby#cancelOrder
     * @description cancels an open order
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/xian-huo-jiao-yi#che-xiao-ding-dan // spot
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/gang-gan-jiao-yi#che-xiao-gang-gan-ding-dan // margin
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/he-yue-jiao-yi#qu-xiao-ding-dan // contract
     * @param {string} id order id
     * @param {string} symbol unified symbol of the market the order was made in
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {bool} [params.margin] *spot markets only* whether to fetch a margin order, default is false (spot order)
     * @returns Response from the exchange
     */
    async cancelOrder (id: string, symbol: Str = undefined, params = {}) {
        await this.loadMarkets ();
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' cancelOrder() requires a symbol argument');
        }
        const market = this.market (symbol);
        const marketId = market['id'];
        const request: Dict = {
            'orderId': id,
        };
        let response = undefined;
        if (market['contract']) {
            request['contractName'] = marketId;
            response = await this.privatePostFuturesOpenFapiV1Cancel (this.extend (request, params));
        } else {
            request['symbol'] = marketId;
            let margin = false;
            [ margin, params ] = this.handleOptionAndParams (params, 'cancelOrder', 'margin', margin);
            if (margin) {
                response = await this.privatePostSpotOpenSapiV1MarginCancel (this.extend (request, params));
            } else {
                response = await this.privatePostSpotOpenSapiV1Cancel (this.extend (request, params));
            }
        }
        return this.parseOrder (response, market);
    }

    /**
     * @method
     * @name bitbaby#cancelOrders
     * @description cancel multiple orders for contract markets
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/xian-huo-jiao-yi#pi-liang-che-xiao-ding-dan
     * @param {string[]} ids order ids
     * @param {string} symbol unified symbol of the market the order was made in
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an list of [order structures]{@link https://docs.ccxt.com/?id=order-structure}
     */
    async cancelOrders (ids: string[], symbol: Str = undefined, params = {}) {
        await this.loadMarkets ();
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' cancelOrders() requires a symbol argument');
        }
        const market = this.market (symbol);
        if (!market['spot']) {
            throw new NotSupported (this.id + ' cancelOrders() supports spot markets only');
        }
        const request: Dict = {
            'symbol': market['id'],
            'orderIds': ids,
        };
        const response = await this.privatePostSpotOpenSapiV1BatchCancel (this.extend (request, params));
        const allOrders = [];
        const successIds = this.safeList (response, 'success', []);
        for (let i = 0; i < successIds.length; i++) {
            const id = successIds[i];
            allOrders.push (this.safeOrder ({ 'id': id, 'status': 'canceled' }, market));
        }
        const failIds = this.safeList (response, 'failed', []);
        for (let i = 0; i < failIds.length; i++) {
            const id = failIds[i];
            allOrders.push (this.safeOrder ({ 'id': id, 'status': 'failed' }, market));
        }
        return allOrders;
    }

    parseOrder (order: Dict, market: Market = undefined): Order {
        //
        // createOrder spot
        //     {
        //         "symbol": "dogeusdt",
        //         "newClientOrderId": null,
        //         "side": "BUY",
        //         "executedQty": 0,
        //         "orderId": [
        //             "3176901856236716480"
        //         ],
        //         "price": 0,
        //         "origQty": 20,
        //         "clientOrderId": null,
        //         "transactTime": 1775144786145,
        //         "type": "MARKET",
        //         "status": "NEW"
        //     }
        //
        // fetchOrder spot (limit)
        //     {
        //         "symbol": "dogeusdt",
        //         "side": "BUY",
        //         "executedQty": 0E-16,
        //         "orderId": "3176908865623394614",
        //         "price": 0.0100000000000000,
        //         "origQty": 20.0000000000000000,
        //         "avgPrice": 0E-16,
        //         "transactTime": 1775156645000,
        //         "type": "LIMIT",
        //         "status": "New Order"
        //     }
        //
        // fetchOrder spot (market)
        //     {
        //         "symbol": "dogeusdt",
        //         "side": "BUY",
        //         "executedQty": 222.0988300000000000,
        //         "orderId": "3176908865623394615",
        //         "price": 0E-16,
        //         "origQty": 20.0000000000000000,
        //         "avgPrice": 0.0900500000000000,
        //         "transactTime": 1775156645000,
        //         "type": "MARKET",
        //         "status": "Partially Filled/Cancelled"
        //     }
        //
        // fetchOpenOrders spot
        //     {
        //         "symbol": "DOGEUSDT",
        //         "newClientOrderId": null,
        //         "side": "BUY",
        //         "executedQty": "0",
        //         "orderId": "3176908865623394614",
        //         "price": "0.01",
        //         "origQty": "20",
        //         "avgPrice": "0",
        //         "time": 1775156645000,
        //         "type": "LIMIT",
        //         "status": "New Order"
        //     }
        //
        // fetchOpenOrders contract
        //     {
        //         "side": "SELL",
        //         "clientId": "1_0.7_1775037590976_sell_s0p",
        //         "executedQty": 2189,
        //         "orderId": 3215386721681467793,
        //         "origQty": 46869.0000000000000000,
        //         "avgPrice": 0.09235000,
        //         "mergeSplitMode": 1,
        //         "type": "LIMIT",
        //         "positionId": 107154,
        //         "price": 0.0923500000000000,
        //         "transactTime": 1775037591000,
        //         "action": "OPEN",
        //         "contractName": "E-DOGE-USDT",
        //         "timeInForce": "POST_ONLY",
        //         "status": "PART_FILLED"
        //     }
        //
        const marketId = this.safeString (order, 'symbol');
        market = this.safeMarket (marketId, market);
        const symbol = market['symbol'];
        const timestamp = this.safeInteger2 (order, 'transactTime', 'time');
        let id = this.safeString (order, 'orderId');
        const orderIds = this.safeList (order, 'orderId');
        if ((id === undefined) && (orderIds !== undefined)) {
            id = this.safeString (orderIds, 0);
        }
        const rawStatus = this.safeStringUpper (order, 'status');
        const side = this.safeStringLower (order, 'side');
        const type = this.safeStringLower (order, 'type');
        let amount = this.safeString (order, 'origQty');
        if ((type === 'market') && (side === 'buy')) {
            amount = undefined; // for market buy orders origQty is in quote currency, we will use cost instead
        }
        let postOnly = undefined;
        let timeInForce = this.safeStringUpper (order, 'timeInForce');
        if (timeInForce !== undefined) {
            if (timeInForce === 'POST_ONLY') {
                timeInForce = 'PO';
                postOnly = true;
            } else {
                postOnly = false;
            }
        }
        return this.safeOrder ({
            'id': id,
            'clientOrderId': this.safeStringN (order, [ 'clientOrderId', 'newClientOrderId', 'clientId' ]),
            'symbol': symbol,
            'type': type,
            'timeInForce': timeInForce,
            'postOnly': postOnly,
            'reduceOnly': undefined,
            'side': side,
            'amount': amount,
            'price': this.omitZero (this.safeString (order, 'price')),
            'triggerPrice': undefined,
            'cost': undefined,
            'filled': this.safeString (order, 'executedQty'),
            'remaining': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'fee': undefined,
            'status': this.parseOrderStatus (rawStatus),
            'lastTradeTimestamp': undefined,
            'lastUpdateTimestamp': undefined,
            'average': this.omitZero (this.safeString (order, 'avgPrice')),
            'trades': undefined,
            'stopLossPrice': undefined,
            'takeProfitPrice': undefined,
            'info': order,
        }, market);
    }

    parseOrderStatus (status) {
        const statuses = {
            'NEW': 'open',
            'NEW ORDER': 'open',
            'PARTIALLY_FILLED': 'open',
            'PART_FILLED': 'open',
            'FILLED': 'closed',
            'CANCELED': 'canceled',
            'CANCELLED': 'canceled',
            'PENDING_CANCEL': 'pending',
            'PARTIALLY FILLED/CANCELLED': 'closed',
            'REJECTED': 'rejected',
        };
        return this.safeString (statuses, status, status);
    }

    /**
     * @method
     * @name bitbaby#fetchMyTrades
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/xian-huo-jiao-yi#jiao-yi-ji-lu // spot
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/gang-gan-jiao-yi#gang-gan-jiao-yi-ji-lu // margin
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/he-yue-jiao-yi#jiao-yi-ji-lu // contract
     * @description fetch all trades made by the user
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch trades for
     * @param {int} [limit] the maximum number of trades structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {bool} [params.margin] *spot markets only* whether to fetch a margin order, default is false (spot order)
     * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/?id=trade-structure}
     */
    async fetchMyTrades (symbol: Str = undefined, since: Int = undefined, limit: Int = undefined, params = {}) {
        await this.loadMarkets ();
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' fetchMyTrades() requires a symbol argument');
        }
        const market = this.market (symbol);
        const marketId = market['id'];
        const isContract = market['contract'];
        const request: Dict = {};
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        let response = undefined;
        if (isContract) {
            request['contractName'] = marketId;
            response = await this.privateGetFuturesOpenFapiV1MyTrades (this.extend (request, params));
        } else {
            request['symbol'] = marketId;
            let margin = false;
            [ margin, params ] = this.handleOptionAndParams (params, 'fetchMyTrades', 'margin', margin);
            if (margin) {
                response = await this.privateGetSpotOpenSapiV1MarginMyTrades (this.extend (request, params));
            } else {
                //
                //     [
                //         {
                //             "symbol": "DOGEUSDT",
                //             "side": "BUY",
                //             "fee": "0.4652193",
                //             "isMaker": false,
                //             "isBuyer": true,
                //             "bidId": 3206077345740844498,
                //             "bidUserId": 1047121,
                //             "feeCoin": "DOGE",
                //             "price": "0.09028",
                //             "qty": "232.60965",
                //             "askId": 3176911270805052610,
                //             "id": "6137967",
                //             "time": 1775161045250,
                //             "isSelf": false,
                //             "askUserId": 1000048
                //         }
                //     ]
                //
                response = await this.privateGetSpotOpenSapiV1MyTrades (this.extend (request, params));
            }
        }
        return this.parseTrades (response, market, since, limit);
    }

    /**
     * @method
     * @name bitbaby#fetchBalance
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/xian-huo-jiao-yi#zhang-hu-xin-xi // spot
     * @see https://bitbaby-1.gitbook.io/bitbaby-api/he-yue-jiao-yi#zhang-hu // contract
     * @description query for balance and get the amount of funds available for trading or funds locked in positions
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.type] 'spot' or 'swap' (default is 'spot')
     * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
     */
    async fetchBalance (params = {}): Promise<Balances> {
        let type = undefined;
        [ type, params ] = this.handleMarketTypeAndParams ('fetchBalance', undefined, params);
        let response = undefined;
        if (type === 'spot') {
            //
            //     {
            //         "balances": [
            //             {
            //                 "asset": "BSCUSDT",
            //                 "free": "0.0000000000",
            //                 "locked": "0.0000000000"
            //             }
            //         ]
            //     }
            response = await this.privateGetSpotOpenSapiV1Account (params);
        } else {
            response = await this.privateGetFuturesOpenFapiV1Account (params);
        }
        return this.parseBalance (response);
    }

    parseBalance (response): Balances {
        const result: Dict = {
            'info': response,
        };
        const balances = this.safeList (response, 'balances', []);
        for (let i = 0; i < balances.length; i++) {
            const entry = this.safeDict (balances, i);
            const id = this.safeString (entry, 'asset');
            const code = this.safeCurrencyCode (id);
            const account = this.account ();
            account['free'] = this.safeString (entry, 'free');
            account['used'] = this.safeString (entry, 'locked');
            result[code] = account;
        }
        return this.safeBalance (result);
    }

    sign (path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        let endpoint = this.implodeParams (path, params);
        const query = this.omit (params, this.extractParams (path));
        if (method === 'GET') {
            if (Object.keys (query).length) {
                endpoint += '?' + this.urlencode (query);
            }
        }
        if (api === 'private') {
            this.checkRequiredCredentials ();
            const timestamp = this.nonce ().toString ();
            let signaturePath = endpoint.replace ('spot/open', '');
            signaturePath = signaturePath.replace ('futures/open', '');
            let payload = timestamp + method + signaturePath;
            if (method === 'POST') {
                body = this.json (query);
                payload += body;
            }
            const signature = this.hmac (this.encode (payload), this.encode (this.secret), sha256);
            headers = {
                'X-CH-APIKEY': this.apiKey,
                'X-CH-SIGN': signature,
                'X-CH-TS': timestamp,
            };
            if (method === 'POST') {
                headers['Content-Type'] = 'application/json';
            }
        }
        const url = this.urls['api'][api] + '/' + endpoint;
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }
}
