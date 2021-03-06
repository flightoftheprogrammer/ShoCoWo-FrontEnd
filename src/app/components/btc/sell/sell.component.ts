import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../../services/crypto.service';
import { HoldingService } from '../../../services/holding.service';
import { BackendService } from '../../../services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellBtcComponent implements OnInit {

  objectKeys = Object.keys;
  availableFunds: number;
  cryptos: any;
  cryptoPrice: number;
  sellAmount: number = 0;
  holdingId: number;

  constructor (private _router: Router, private _data: CryptoService, private _holding: HoldingService, private _backend: BackendService) {

  }

  ngOnInit() {
    this._data.getBtcPrice()
    .subscribe(res => {
      this.cryptos = res;
      this.cryptoPrice = res["BTC"]["USD"];
    })
    this.getHoldingId(1);
    this._holding.getHoldingByCurrencyId(1).subscribe(value => this.availableFunds = value["CryptoHoldingBalance"])
  }

  getHoldingId(currencyId: number) {
    this._holding.getHoldings().subscribe(result => {
      for(var key in result) {
        if (result.hasOwnProperty(key)) {
          if (result[key]["CurrencyId"] == currencyId) {
            this.holdingId = result[key]["HoldingId"]
          }
        }
      }
    })
  }

  makeSale(amount: number) {
    this._holding.postHoldingTransaction(this.holdingId, -amount, this.cryptoPrice).subscribe()
    window.location.reload();
    this._router.navigate(['/btc']);
  }

}
