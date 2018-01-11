import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChartService {

    constructor(private _http: HttpClient) { }

    dailyBtcPrice() {
        return this._http.get("https://api.coindesk.com/v1/bpi/historical/close.json")
            .map(result =>result);
    }

}