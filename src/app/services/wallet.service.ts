import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const ApiUrl = 'http://flightoftheprogrammer.azurewebsites.net/api';

@Injectable()
export class WalletService {
    constructor(private _http:HttpClient) { }

    getWallet() {
        return this._http.get(`${Api_Url}/Wallet`, {headers: this.getHeaders()});
    }

    private getHeaders() {
        return new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('id_token')}`);
    }
}