namespace ccxt.pro;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


public partial class blockchaincom { public blockchaincom(object args = null) : base(args) { } }
public partial class blockchaincom : ccxt.blockchaincom
{
    public override object describe()
    {
        return this.deepExtend(base.describe(), new Dictionary<string, object>() {
            { "has", new Dictionary<string, object>() {
                { "ws", true },
                { "watchBalance", true },
                { "watchTicker", true },
                { "watchTickers", false },
                { "watchTrades", true },
                { "watchTradesForSymbols", false },
                { "watchMyTrades", false },
                { "watchOrders", true },
                { "watchOrderBook", true },
                { "watchOHLCV", true },
            } },
            { "urls", new Dictionary<string, object>() {
                { "api", new Dictionary<string, object>() {
                    { "ws", "wss://ws.blockchain.info/mercury-gateway/v1/ws" },
                } },
            } },
            { "options", new Dictionary<string, object>() {
                { "ws", new Dictionary<string, object>() {
                    { "options", new Dictionary<string, object>() {
                        { "headers", new Dictionary<string, object>() {
                            { "Origin", "https://exchange.blockchain.com" },
                        } },
                    } },
                    { "noOriginHeader", false },
                } },
            } },
            { "streaming", new Dictionary<string, object>() {} },
            { "exceptions", new Dictionary<string, object>() {} },
            { "timeframes", new Dictionary<string, object>() {
                { "1m", "60" },
                { "5m", "300" },
                { "15m", "900" },
                { "1h", "3600" },
                { "6h", "21600" },
                { "1d", "86400" },
            } },
        });
    }

    /**
     * @method
     * @name blockchaincom#watchBalance
     * @description watch balance and get the amount of funds available for trading or funds locked in orders
     * @see https://exchange.blockchain.com/api/#balances
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
     */
    public async override Task<object> watchBalance(object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        await this.authenticate(parameters);
        object messageHash = "balance";
        object url = getValue(getValue(this.urls, "api"), "ws");
        object subscribe = new Dictionary<string, object>() {
            { "action", "subscribe" },
            { "channel", "balances" },
        };
        object request = this.deepExtend(subscribe, parameters);
        return await this.watch(url, messageHash, request, messageHash, request);
    }

    public virtual void handleBalance(WebSocketClient client, object message)
    {
        //
        //  subscribed
        //     {
        //         "seqnum": 1,
        //         "event": "subscribed",
        //         "channel": "balances",
        //         "local_currency": "USD",
        //         "batching": false
        //     }
        //  snapshot
        //     {
        //         "seqnum": 2,
        //         "event": "snapshot",
        //         "channel": "balances",
        //         "balances": [
        //           {
        //             "currency": "BTC",
        //             "balance": 0.00366963,
        //             "available": 0.00266963,
        //             "balance_local": 38.746779155,
        //             "available_local": 28.188009155,
        //             "rate": 10558.77
        //           },
        //            ...
        //         ],
        //         "total_available_local": 65.477864168,
        //         "total_balance_local": 87.696634168
        //     }
        //
        object eventVar = this.safeString(message, "event");
        if (isTrue(isEqual(eventVar, "subscribed")))
        {
            return;
        }
        object result = new Dictionary<string, object>() {
            { "info", message },
        };
        object balances = this.safeValue(message, "balances", new List<object>() {});
        for (object i = 0; isLessThan(i, getArrayLength(balances)); postFixIncrement(ref i))
        {
            object entry = getValue(balances, i);
            object currencyId = this.safeString(entry, "currency");
            object code = this.safeCurrencyCode(currencyId);
            object account = this.account();
            ((IDictionary<string,object>)account)["free"] = this.safeString(entry, "available");
            ((IDictionary<string,object>)account)["total"] = this.safeString(entry, "balance");
            ((IDictionary<string,object>)result)[(string)code] = account;
        }
        object messageHash = "balance";
        this.balance = this.safeBalance(result);
        callDynamically(client as WebSocketClient, "resolve", new object[] {this.balance, messageHash});
    }

    /**
     * @method
     * @name blockchaincom#watchOHLCV
     * @description watches historical candlestick data containing the open, high, low, and close price, and the volume of a market.
     * @see https://exchange.blockchain.com/api/#prices
     * @param {string} symbol unified symbol of the market to fetch OHLCV data for
     * @param {string} timeframe the length of time each candle represents. Allows '1m', '5m', '15m', '1h', '6h' '1d'. Can only watch one timeframe per symbol.
     * @param {int} [since] timestamp in ms of the earliest candle to fetch
     * @param {int} [limit] the maximum amount of candles to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
     */
    public async override Task<object> watchOHLCV(object symbol, object timeframe = null, object since = null, object limit = null, object parameters = null)
    {
        timeframe ??= "1m";
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        object market = this.market(symbol);
        symbol = getValue(market, "symbol");
        object interval = this.safeString(this.timeframes, timeframe, timeframe);
        object messageHash = add("ohlcv:", symbol);
        object request = new Dictionary<string, object>() {
            { "action", "subscribe" },
            { "channel", "prices" },
            { "symbol", getValue(market, "id") },
            { "granularity", this.parseNumber(interval) },
        };
        request = this.deepExtend(request, parameters);
        object url = getValue(getValue(this.urls, "api"), "ws");
        object ohlcv = await this.watch(url, messageHash, request, messageHash, request);
        if (isTrue(this.newUpdates))
        {
            limit = callDynamically(ohlcv, "getLimit", new object[] {symbol, limit});
        }
        return this.filterBySinceLimit(ohlcv, since, limit, 0, true);
    }

    public virtual void handleOHLCV(WebSocketClient client, object message)
    {
        //
        //  subscribed
        //     {
        //         "seqnum": 0,
        //         "event": "subscribed",
        //         "channel": "prices",
        //         "symbol": "BTC-USDT",
        //         "granularity": 60
        //     }
        //
        //  updated
        //     {
        //         "seqnum": 1,
        //         "event": "updated",
        //         "channel": "prices",
        //         "symbol": "BTC-USD",
        //         "price": [ 1660085580000, 23185.215, 23185.935, 23164.79, 23169.97, 0 ]
        //     }
        //
        object eventVar = this.safeString(message, "event");
        if (isTrue(isEqual(eventVar, "rejected")))
        {
            object jsonMessage = this.json(message);
            throw new ExchangeError ((string)add(add(this.id, " "), jsonMessage)) ;
        } else if (isTrue(isEqual(eventVar, "updated")))
        {
            object marketId = this.safeString(message, "symbol");
            object symbol = this.safeSymbol(marketId, null, "-");
            object messageHash = add("ohlcv:", symbol);
            object request = this.safeValue(((WebSocketClient)client).subscriptions, messageHash);
            object timeframeId = this.safeNumber(request, "granularity");
            object timeframe = this.findTimeframe(timeframeId);
            object ohlcv = this.safeValue(message, "price", new List<object>() {});
            ((IDictionary<string,object>)this.ohlcvs)[(string)symbol] = this.safeValue(this.ohlcvs, symbol, new Dictionary<string, object>() {});
            object stored = this.safeValue(getValue(this.ohlcvs, symbol), timeframe);
            if (isTrue(isEqual(stored, null)))
            {
                object limit = this.safeInteger(this.options, "OHLCVLimit", 1000);
                stored = new ArrayCacheByTimestamp(limit);
                ((IDictionary<string,object>)getValue(this.ohlcvs, symbol))[(string)timeframe] = stored;
            }
            callDynamically(stored, "append", new object[] {ohlcv});
            callDynamically(client as WebSocketClient, "resolve", new object[] {stored, messageHash});
        } else if (isTrue(!isEqual(eventVar, "subscribed")))
        {
            throw new NotSupported ((string)add(add(this.id, " "), this.json(message))) ;
        }
    }

    /**
     * @method
     * @name blockchaincom#watchTicker
     * @description watches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
     * @see https://exchange.blockchain.com/api/#ticker
     * @param {string} symbol unified symbol of the market to fetch the ticker for
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    public async override Task<object> watchTicker(object symbol, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        object market = this.market(symbol);
        symbol = getValue(market, "symbol");
        object url = getValue(getValue(this.urls, "api"), "ws");
        object messageHash = add("ticker:", symbol);
        object request = new Dictionary<string, object>() {
            { "action", "subscribe" },
            { "channel", "ticker" },
            { "symbol", getValue(market, "id") },
        };
        request = this.deepExtend(request, parameters);
        return await this.watch(url, messageHash, request, messageHash);
    }

    public virtual void handleTicker(WebSocketClient client, object message)
    {
        //
        //  subscribed
        //     {
        //         "seqnum": 0,
        //         "event": "subscribed",
        //         "channel": "ticker",
        //         "symbol": "BTC-USD"
        //     }
        //  snapshot
        //     {
        //         "seqnum": 1,
        //         "event": "snapshot",
        //         "channel": "ticker",
        //         "symbol": "BTC-USD",
        //         "price_24h": 23071.4,
        //         "volume_24h": 236.28398636,
        //         "last_trade_price": 23936.4,
        //         "mark_price": 23935.335240262
        //     }
        // update
        //     {
        //         "seqnum": 2,
        //         "event": "updated",
        //         "channel": "ticker",
        //         "symbol": "BTC-USD",
        //         "mark_price": 23935.242443617
        //     }
        //
        object eventVar = this.safeString(message, "event");
        object marketId = this.safeString(message, "symbol");
        object market = this.safeMarket(marketId);
        object symbol = getValue(market, "symbol");
        object ticker = null;
        if (isTrue(isEqual(eventVar, "subscribed")))
        {
            return;
        } else if (isTrue(isEqual(eventVar, "snapshot")))
        {
            ticker = this.parseTicker(message, market);
        } else if (isTrue(isEqual(eventVar, "updated")))
        {
            object lastTicker = this.safeValue(this.tickers, symbol);
            ticker = this.parseWsUpdatedTicker(message, lastTicker, market);
        }
        object messageHash = add("ticker:", symbol);
        ((IDictionary<string,object>)this.tickers)[(string)symbol] = ticker;
        callDynamically(client as WebSocketClient, "resolve", new object[] {ticker, messageHash});
    }

    public virtual object parseWsUpdatedTicker(object ticker, object lastTicker = null, object market = null)
    {
        //
        //     {
        //         "seqnum": 2,
        //         "event": "updated",
        //         "channel": "ticker",
        //         "symbol": "BTC-USD",
        //         "mark_price": 23935.242443617
        //     }
        //
        object marketId = this.safeString(ticker, "symbol");
        object symbol = this.safeSymbol(marketId, null, "-");
        object last = this.safeString(ticker, "mark_price");
        return this.safeTicker(new Dictionary<string, object>() {
            { "symbol", symbol },
            { "timestamp", null },
            { "datetime", null },
            { "high", null },
            { "low", null },
            { "bid", null },
            { "bidVolume", null },
            { "ask", null },
            { "askVolume", null },
            { "vwap", null },
            { "open", this.safeString(lastTicker, "open") },
            { "close", null },
            { "last", last },
            { "previousClose", this.safeString(lastTicker, "close") },
            { "change", null },
            { "percentage", null },
            { "average", null },
            { "baseVolume", this.safeString(lastTicker, "baseVolume") },
            { "quoteVolume", null },
            { "info", this.extend(this.safeValue(lastTicker, "info", new Dictionary<string, object>() {}), ticker) },
        }, market);
    }

    /**
     * @method
     * @name blockchaincom#watchTrades
     * @description get the list of most recent trades for a particular symbol
     * @see https://exchange.blockchain.com/api/#trades
     * @param {string} symbol unified symbol of the market to fetch trades for
     * @param {int} [since] timestamp in ms of the earliest trade to fetch
     * @param {int} [limit] the maximum amount of    trades to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
     */
    public async override Task<object> watchTrades(object symbol, object since = null, object limit = null, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        object market = this.market(symbol);
        symbol = getValue(market, "symbol");
        object url = getValue(getValue(this.urls, "api"), "ws");
        object messageHash = add("trades:", symbol);
        object request = new Dictionary<string, object>() {
            { "action", "subscribe" },
            { "channel", "trades" },
            { "symbol", getValue(market, "id") },
        };
        request = this.deepExtend(request, parameters);
        object trades = await this.watch(url, messageHash, request, messageHash, request);
        return this.filterBySinceLimit(trades, since, limit, "timestamp", true);
    }

    public virtual void handleTrades(WebSocketClient client, object message)
    {
        //
        //  subscribed
        //     {
        //         "seqnum": 0,
        //         "event": "subscribed",
        //         "channel": "trades",
        //         "symbol": "BTC-USDT"
        //     }
        //  updates
        //     {
        //         "seqnum": 1,
        //         "event": "updated",
        //         "channel": "trades",
        //         "symbol": "BTC-USDT",
        //         "timestamp": "2022-08-08T17:23:48.163096Z",
        //         "side": "sell",
        //         "qty": 0.083523,
        //         "price": 23940.67,
        //         "trade_id": "563078810223444"
        //     }
        //
        object eventVar = this.safeString(message, "event");
        if (isTrue(!isEqual(eventVar, "updated")))
        {
            return;
        }
        object marketId = this.safeString(message, "symbol");
        object symbol = this.safeSymbol(marketId);
        object market = this.safeMarket(marketId);
        object messageHash = add("trades:", symbol);
        object stored = this.safeValue(this.trades, symbol);
        if (isTrue(isEqual(stored, null)))
        {
            object limit = this.safeInteger(this.options, "tradesLimit", 1000);
            stored = new ArrayCache(limit);
            ((IDictionary<string,object>)this.trades)[(string)symbol] = stored;
        }
        object parsed = this.parseWsTrade(message, market);
        callDynamically(stored, "append", new object[] {parsed});
        ((IDictionary<string,object>)this.trades)[(string)symbol] = stored;
        callDynamically(client as WebSocketClient, "resolve", new object[] {getValue(this.trades, symbol), messageHash});
    }

    public override object parseWsTrade(object trade, object market = null)
    {
        //
        //     {
        //         "seqnum": 1,
        //         "event": "updated",
        //         "channel": "trades",
        //         "symbol": "BTC-USDT",
        //         "timestamp": "2022-08-08T17:23:48.163096Z",
        //         "side": "sell",
        //         "qty": 0.083523,
        //         "price": 23940.67,
        //         "trade_id": "563078810223444"
        //     }
        //
        object marketId = this.safeString(trade, "symbol");
        object datetime = this.safeString(trade, "timestamp");
        return this.safeTrade(new Dictionary<string, object>() {
            { "id", this.safeString(trade, "trade_id") },
            { "timestamp", this.parse8601(datetime) },
            { "datetime", datetime },
            { "symbol", this.safeSymbol(marketId, market, "-") },
            { "order", null },
            { "type", null },
            { "side", this.safeString(trade, "side") },
            { "takerOrMaker", null },
            { "price", this.safeString(trade, "price") },
            { "amount", this.safeString(trade, "qty") },
            { "cost", null },
            { "fee", null },
            { "info", trade },
        }, market);
    }

    /**
     * @method
     * @name blockchaincom#fetchOrders
     * @description watches information on multiple orders made by the user
     * @see https://exchange.blockchain.com/api/#mass-order-status-request-ordermassstatusrequest
     * @param {string} symbol unified market symbol of the market orders were made in
     * @param {int} [since] the earliest time in ms to fetch orders for
     * @param {int} [limit] the maximum number of order structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    public async override Task<object> watchOrders(object symbol = null, object since = null, object limit = null, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        await this.authenticate();
        if (isTrue(!isEqual(symbol, null)))
        {
            object market = this.market(symbol);
            symbol = getValue(market, "symbol");
        }
        object url = getValue(getValue(this.urls, "api"), "ws");
        object message = new Dictionary<string, object>() {
            { "action", "subscribe" },
            { "channel", "trading" },
        };
        object messageHash = "orders";
        object request = this.deepExtend(message, parameters);
        object orders = await this.watch(url, messageHash, request, messageHash);
        if (isTrue(this.newUpdates))
        {
            limit = callDynamically(orders, "getLimit", new object[] {symbol, limit});
        }
        return this.filterBySymbolSinceLimit(orders, symbol, since, limit, true);
    }

    public virtual void handleOrders(WebSocketClient client, object message)
    {
        //
        //     {
        //         "seqnum": 1,
        //         "event": "rejected",
        //         "channel": "trading",
        //         "text": "Not subscribed to channel"
        //     }
        //  snapshot
        //     {
        //         "seqnum": 2,
        //         "event": "snapshot",
        //         "channel": "trading",
        //         "orders": [
        //           {
        //             "orderID": "562965341621940",
        //             "gwOrderId": 181011136260,
        //             "clOrdID": "016caf67f7a94508webd",
        //             "symbol": "BTC-USD",
        //             "side": "sell",
        //             "ordType": "limit",
        //             "orderQty": 0.000675,
        //             "leavesQty": 0.000675,
        //             "cumQty": 0,
        //             "avgPx": 0,
        //             "ordStatus": "open",
        //             "timeInForce": "GTC",
        //             "text": "New order",
        //             "execType": "0",
        //             "execID": "21415965325",
        //             "transactTime": "2022-08-08T23:31:00.550795Z",
        //             "msgType": 8,
        //             "lastPx": 0,
        //             "lastShares": 0,
        //             "tradeId": "0",
        //             "fee": 0,
        //             "price": 30000,
        //             "marginOrder": false,
        //             "closePositionOrder": false
        //           }
        //         ],
        //         "positions": []
        //     }
        //  update
        //     {
        //         "seqnum": 3,
        //         "event": "updated",
        //         "channel": "trading",
        //         "orderID": "562965341621940",
        //         "gwOrderId": 181011136260,
        //         "clOrdID": "016caf67f7a94508webd",
        //         "symbol": "BTC-USD",
        //         "side": "sell",
        //         "ordType": "limit",
        //         "orderQty": 0.000675,
        //         "leavesQty": 0.000675,
        //         "cumQty": 0,
        //         "avgPx": 0,
        //         "ordStatus": "cancelled",
        //         "timeInForce": "GTC",
        //         "text": "Canceled by User",
        //         "execType": "4",
        //         "execID": "21416034921",
        //         "transactTime": "2022-08-08T23:33:25.727785Z",
        //         "msgType": 8,
        //         "lastPx": 0,
        //         "lastShares": 0,
        //         "tradeId": "0",
        //         "fee": 0,
        //         "price": 30000,
        //         "marginOrder": false,
        //         "closePositionOrder": false
        //     }
        //
        object eventVar = this.safeString(message, "event");
        object messageHash = "orders";
        object cachedOrders = this.orders;
        if (isTrue(isEqual(cachedOrders, null)))
        {
            object limit = this.safeInteger(this.options, "ordersLimit", 1000);
            this.orders = new ArrayCacheBySymbolById(limit);
        }
        if (isTrue(isEqual(eventVar, "subscribed")))
        {
            return;
        } else if (isTrue(isEqual(eventVar, "rejected")))
        {
            throw new ExchangeError ((string)add(add(this.id, " "), this.json(message))) ;
        } else if (isTrue(isEqual(eventVar, "snapshot")))
        {
            object orders = this.safeValue(message, "orders", new List<object>() {});
            for (object i = 0; isLessThan(i, getArrayLength(orders)); postFixIncrement(ref i))
            {
                object order = getValue(orders, i);
                object parsedOrder = this.parseWsOrder(order);
                callDynamically(cachedOrders, "append", new object[] {parsedOrder});
            }
        } else if (isTrue(isEqual(eventVar, "updated")))
        {
            object parsedOrder = this.parseWsOrder(message);
            callDynamically(cachedOrders, "append", new object[] {parsedOrder});
        }
        this.orders = cachedOrders;
        callDynamically(client as WebSocketClient, "resolve", new object[] {this.orders, messageHash});
    }

    public override object parseWsOrder(object order, object market = null)
    {
        //
        //     {
        //         "seqnum": 3,
        //         "event": "updated",
        //         "channel": "trading",
        //         "orderID": "562965341621940",
        //         "gwOrderId": 181011136260,
        //         "clOrdID": "016caf67f7a94508webd",
        //         "symbol": "BTC-USD",
        //         "side": "sell",
        //         "ordType": "limit",
        //         "orderQty": 0.000675,
        //         "leavesQty": 0.000675,
        //         "cumQty": 0,
        //         "avgPx": 0,
        //         "ordStatus": "cancelled",
        //         "timeInForce": "GTC",
        //         "text": "Canceled by User",
        //         "execType": "4",
        //         "execID": "21416034921",
        //         "transactTime": "2022-08-08T23:33:25.727785Z",
        //         "msgType": 8,
        //         "lastPx": 0,
        //         "lastShares": 0,
        //         "tradeId": "0",
        //         "fee": 0,
        //         "price": 30000,
        //         "marginOrder": false,
        //         "closePositionOrder": false
        //     }
        //
        object datetime = this.safeString(order, "transactTime");
        object status = this.safeString(order, "ordStatus");
        object marketId = this.safeString(order, "symbol");
        market = this.safeMarket(marketId, market);
        object tradeId = this.safeString(order, "tradeId");
        object trades = new List<object>() {};
        if (isTrue(!isEqual(tradeId, "0")))
        {
            ((IList<object>)trades).Add(new Dictionary<string, object>() {
                { "id", tradeId },
            });
        }
        return this.safeOrder(new Dictionary<string, object>() {
            { "id", this.safeString(order, "orderID") },
            { "clientOrderId", this.safeString(order, "clOrdID") },
            { "datetime", datetime },
            { "timestamp", this.parse8601(datetime) },
            { "status", this.parseWsOrderStatus(status) },
            { "symbol", this.safeSymbol(marketId, market) },
            { "type", this.safeString(order, "ordType") },
            { "timeInForce", this.safeString(order, "timeInForce") },
            { "postOnly", isEqual(this.safeString(order, "execInst"), "ALO") },
            { "side", this.safeString(order, "side") },
            { "price", this.safeString(order, "price") },
            { "stopPrice", this.safeString(order, "stopPx") },
            { "cost", null },
            { "amount", this.safeString(order, "orderQty") },
            { "filled", this.safeString(order, "cumQty") },
            { "remaining", this.safeString(order, "leavesQty") },
            { "trades", trades },
            { "fee", new Dictionary<string, object>() {
                { "rate", null },
                { "cost", this.safeNumber(order, "fee") },
                { "currency", this.safeString(market, "quote") },
            } },
            { "info", order },
            { "lastTradeTimestamp", null },
            { "average", this.safeString(order, "avgPx") },
        }, market);
    }

    public virtual object parseWsOrderStatus(object status)
    {
        object statuses = new Dictionary<string, object>() {
            { "pending", "open" },
            { "open", "open" },
            { "rejected", "rejected" },
            { "cancelled", "canceled" },
            { "filled", "closed" },
            { "partial", "open" },
            { "expired", "expired" },
        };
        return this.safeString(statuses, status, status);
    }

    /**
     * @method
     * @name blockchaincom#watchOrderBook
     * @description watches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
     * @see https://exchange.blockchain.com/api/#l2-order-book
     * @param {string} symbol unified symbol of the market to fetch the order book for
     * @param {int} [limit] the maximum amount of order book entries to return
     * @param {objectConstructor} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.type] accepts l2 or l3 for level 2 or level 3 order book
     * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
     */
    public async override Task<object> watchOrderBook(object symbol, object limit = null, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        object market = this.market(symbol);
        object url = getValue(getValue(this.urls, "api"), "ws");
        object type = this.safeString(parameters, "type", "l2");
        parameters = this.omit(parameters, "type");
        object messageHash = add(add(add("orderbook:", symbol), ":"), type);
        object subscribe = new Dictionary<string, object>() {
            { "action", "subscribe" },
            { "channel", type },
            { "symbol", getValue(market, "id") },
        };
        object request = this.deepExtend(subscribe, parameters);
        object orderbook = await this.watch(url, messageHash, request, messageHash);
        return (orderbook as IOrderBook).limit();
    }

    public virtual void handleOrderBook(WebSocketClient client, object message)
    {
        //
        //  subscribe
        //     {
        //         "seqnum": 0,
        //         "event": "subscribed",
        //         "channel": "l2",
        //         "symbol": "BTC-USDT",
        //         "batching": false
        //     }
        //  snapshot
        //     {
        //         "seqnum": 1,
        //         "event": "snapshot",
        //         "channel": "l2",
        //         "symbol": "BTC-USDT",
        //         "bids": [
        //           { num: 1, px: 0.01, qty: 22 },
        //         ],
        //         "asks": [
        //           { num: 1, px: 23840.26, qty: 0.25 },
        //         ],
        //         "timestamp": "2022-08-08T22:03:19.071870Z"
        //     }
        //  update
        //     {
        //         "seqnum": 2,
        //         "event": "updated",
        //         "channel": "l2",
        //         "symbol": "BTC-USDT",
        //         "bids": [],
        //         "asks": [ { num: 1, px: 23855.06, qty: 1.04786347 } ],
        //         "timestamp": "2022-08-08T22:03:19.014680Z"
        //     }
        //
        object eventVar = this.safeString(message, "event");
        if (isTrue(isEqual(eventVar, "subscribed")))
        {
            return;
        }
        object type = this.safeString(message, "channel");
        object marketId = this.safeString(message, "symbol");
        object symbol = this.safeSymbol(marketId);
        object messageHash = add(add(add("orderbook:", symbol), ":"), type);
        object datetime = this.safeString(message, "timestamp");
        object timestamp = this.parse8601(datetime);
        if (isTrue(isEqual(this.safeValue(this.orderbooks, symbol), null)))
        {
            ((IDictionary<string,object>)this.orderbooks)[(string)symbol] = this.countedOrderBook();
        }
        object orderbook = getValue(this.orderbooks, symbol);
        if (isTrue(isEqual(eventVar, "snapshot")))
        {
            object snapshot = this.parseOrderBook(message, symbol, timestamp, "bids", "asks", "px", "qty", "num");
            (orderbook as IOrderBook).reset(snapshot);
        } else if (isTrue(isEqual(eventVar, "updated")))
        {
            object asks = this.safeList(message, "asks", new List<object>() {});
            object bids = this.safeList(message, "bids", new List<object>() {});
            this.handleDeltas(getValue(orderbook, "asks"), asks);
            this.handleDeltas(getValue(orderbook, "bids"), bids);
            ((IDictionary<string,object>)orderbook)["timestamp"] = timestamp;
            ((IDictionary<string,object>)orderbook)["datetime"] = datetime;
        } else
        {
            throw new NotSupported ((string)add(add(add(this.id, " watchOrderBook() does not support "), eventVar), " yet")) ;
        }
        callDynamically(client as WebSocketClient, "resolve", new object[] {orderbook, messageHash});
    }

    public override void handleDelta(object bookside, object delta)
    {
        object bookArray = this.parseBidAsk(delta, "px", "qty", "num");
        (bookside as IOrderBookSide).storeArray(bookArray);
    }

    public override void handleDeltas(object bookside, object deltas)
    {
        for (object i = 0; isLessThan(i, getArrayLength(deltas)); postFixIncrement(ref i))
        {
            this.handleDelta(bookside, getValue(deltas, i));
        }
    }

    public override void handleMessage(WebSocketClient client, object message)
    {
        object channel = this.safeString(message, "channel");
        object handlers = new Dictionary<string, object>() {
            { "ticker", this.handleTicker },
            { "trades", this.handleTrades },
            { "prices", this.handleOHLCV },
            { "l2", this.handleOrderBook },
            { "l3", this.handleOrderBook },
            { "auth", this.handleAuthenticationMessage },
            { "balances", this.handleBalance },
            { "trading", this.handleOrders },
        };
        object handler = this.safeValue(handlers, channel);
        if (isTrue(!isEqual(handler, null)))
        {
            DynamicInvoker.InvokeMethod(handler, new object[] { client, message});
            return;
        }
        throw new NotSupported ((string)add(add(this.id, " received an unsupported message: "), this.json(message))) ;
    }

    public virtual void handleAuthenticationMessage(WebSocketClient client, object message)
    {
        //
        //     {
        //         "seqnum": 0,
        //         "event": "subscribed",
        //         "channel": "auth",
        //         "readOnly": false
        //     }
        //
        object eventVar = this.safeString(message, "event");
        if (isTrue(!isEqual(eventVar, "subscribed")))
        {
            throw new AuthenticationError ((string)add(add(this.id, " received an authentication error: "), this.json(message))) ;
        }
        var future = this.safeValue((client as WebSocketClient).futures, "authenticated");
        if (isTrue(!isEqual(future, null)))
        {
            (future as Future).resolve(true);
        }
    }

    public async virtual Task<object> authenticate(object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        object url = getValue(getValue(this.urls, "api"), "ws");
        var client = this.client(url);
        object messageHash = "authenticated";
        var future = client.future(messageHash);
        object isAuthenticated = this.safeValue(((WebSocketClient)client).subscriptions, messageHash);
        if (isTrue(isEqual(isAuthenticated, null)))
        {
            this.checkRequiredCredentials();
            object request = new Dictionary<string, object>() {
                { "action", "subscribe" },
                { "channel", "auth" },
                { "token", this.secret },
            };
            return this.watch(url, messageHash, this.extend(request, parameters), messageHash);
        }
        return await (future as Exchange.Future);
    }
}
