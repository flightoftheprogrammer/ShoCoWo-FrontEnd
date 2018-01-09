import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../../services/crypto.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellBtcComponent implements OnInit {

  objectKeys = Object.keys;
  cryptos: any;

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
