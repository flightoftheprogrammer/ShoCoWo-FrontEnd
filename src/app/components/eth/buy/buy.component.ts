import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../../services/crypto.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyEthComponent implements OnInit {

  objectKeys = Object.keys;
  cryptos: any;

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
