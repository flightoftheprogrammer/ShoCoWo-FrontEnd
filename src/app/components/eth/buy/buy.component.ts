import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../../services/crypto.service';
import { HoldingService } from '../../../services/holding.service'
import { BackendService } from '../../../services/backend.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy',
  providers: [HoldingService,
              BackendService],
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyEthComponent {

  objectKeys = Object.keys;
  availableFunds: number;
  cryptos: any;
  cryptoPrice: number;
  purchaseAmount: number = 0;
  holdingId: number;

  constructor (private _data: CryptoService, private _holdingService: HoldingService, private _backendService: BackendService, private _router: Router) {

  }

  ngOnInit() {
    this._data.getEthPrice()
    .subscribe(res => {
      this.cryptos = res;
      this.cryptoPrice = res["ETH"]["USD"];
    })
    this.getHoldingId(2)
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
    window.location.reload();
    this._router.navigate(['/eth']);
  }
}