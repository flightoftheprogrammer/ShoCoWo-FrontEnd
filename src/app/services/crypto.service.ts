import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CryptoService {

    result:any;

    constructor(private _http: Http) { }

        getBtcPrice(){
            return this._http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD,ETH,BTC')
            .map(result => this.result = result.json());
        }

        getEthPrice(){
            return this._http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD,ETH,BTC')
            .map(result => this.result = result.json());
        }
}