import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../../services/crypto.service';



@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyBtcComponent {

  objectKeys = Object.keys;
  cryptos: any;
  cryptoPrice: number = 0;

  constructor (private _data: CryptoService) {

  }

  ngOnInit() {
    this._data.getBtcPrice()
    .subscribe(res => {
      this.cryptos = res;
      console.log(res);
    })
  }
}
