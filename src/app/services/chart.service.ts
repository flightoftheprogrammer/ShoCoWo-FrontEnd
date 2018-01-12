import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChartService {

    constructor(private _http: HttpClient) { }

    dailyBtcPrice() {
        return this._http.get("https://api.coindesk.com/v1/bpi/historical/close.json")
            .map(result => result);
    }

    dailyEthPrice() {
        return this._http.get("https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=30&aggregate=1&e=CCCAGG")
            .map(result => result);
    }

}