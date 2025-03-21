// -------------------------------------------------------------------------------

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

// -------------------------------------------------------------------------------

package ccxt

func (this *wazirx) PublicGetExchangeInfo (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("publicGetExchangeInfo", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PublicGetDepth (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("publicGetDepth", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PublicGetPing (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("publicGetPing", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PublicGetSystemStatus (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("publicGetSystemStatus", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PublicGetTickers24hr (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("publicGetTickers24hr", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PublicGetTicker24hr (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("publicGetTicker24hr", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PublicGetTime (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("publicGetTime", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PublicGetTrades (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("publicGetTrades", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PublicGetKlines (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("publicGetKlines", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PrivateGetAccount (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privateGetAccount", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PrivateGetAllOrders (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privateGetAllOrders", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PrivateGetFunds (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privateGetFunds", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PrivateGetHistoricalTrades (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privateGetHistoricalTrades", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PrivateGetOpenOrders (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privateGetOpenOrders", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PrivateGetOrder (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privateGetOrder", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PrivateGetMyTrades (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privateGetMyTrades", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PrivateGetCoins (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privateGetCoins", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PrivateGetCryptoWithdraws (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privateGetCryptoWithdraws", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PrivateGetCryptoDepositsAddress (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privateGetCryptoDepositsAddress", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PrivateGetSubAccountFundTransferHistory (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privateGetSubAccountFundTransferHistory", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PrivateGetSubAccountAccounts (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privateGetSubAccountAccounts", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PrivatePostOrder (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privatePostOrder", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PrivatePostOrderTest (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privatePostOrderTest", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PrivatePostCreateAuthToken (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privatePostCreateAuthToken", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PrivateDeleteOrder (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privateDeleteOrder", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *wazirx) PrivateDeleteOpenOrders (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privateDeleteOpenOrders", parameters))
       PanicOnError(ch)
   }()
   return ch
}
