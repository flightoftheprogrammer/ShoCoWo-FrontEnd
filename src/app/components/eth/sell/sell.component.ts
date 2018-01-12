import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../../services/crypto.service';


@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellEthComponent implements OnInit {

  objectKeys = Object.keys;
  cryptos: any;
  cryptoPrice: number = 0;

  constructor (private _data: CryptoService) {

  }

  ngOnInit() {
    this._data.getEthPrice()
    .subscribe(res => {
      this.cryptos = res;
      console.log(res);
    })
  }

}
