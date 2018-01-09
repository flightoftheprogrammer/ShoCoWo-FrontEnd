import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { encode } from '@angular/router/src/url_tree';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
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