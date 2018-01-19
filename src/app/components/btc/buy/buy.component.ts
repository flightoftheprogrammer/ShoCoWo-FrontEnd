import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../../services/crypto.service';
import { HoldingService } from '../../../services/holding.service'
import { BackendService } from '../../../services/backend.service'

@Component({
  selector: 'app-buy',
  providers: [HoldingService,
              BackendService],
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyBtcComponent {

  objectKeys = Object.keys;
  availableFunds: number;
  cryptos: any;
  cryptoPrice: number;
  purchaseAmount: number = 0;
  holdingId: number;

  constructor (private _data: CryptoService, private _holdingService: HoldingService, private _backendService: BackendService) {

  }

  ngOnInit() {
    
    this._data.getBtcPrice()
    .subscribe(res => {
      this.cryptos = res;
      this.cryptoPrice = res["BTC"]["USD"];
    })
    this.getHoldingId(1)
    this._backendService.getWallet().subscribe(value => this.availableFunds = value['WalletBalance'])
  }

  getHoldingId(currencyId: number): any {
    this._holdingService.getHoldings().subscribe(result => {
      for (var key in result) {
        if (result.hasOwnProperty(key)) {
          if (result[key]['CurrencyId'] == currencyId) {
            this.holdingId = result[key]['HoldingId']
          }
        }
      }
    })
  }

  makePurchase(amount: number) {
    this._holdingService.postHoldingTransaction(this.holdingId, amount, this.cryptoPrice).subscribe()
  }
}
