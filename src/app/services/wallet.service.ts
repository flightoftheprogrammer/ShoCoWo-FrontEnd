import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const Api_Url = 'http://shocowo.azurewebsites.net'

@Injectable()
export class WalletService {
    constructor(private _http:HttpClient) { }

    getWallet() {
        return this._http.get('${ApiUrl}/Wallet', {headers: this.getHeaders()});
    }

    private getHeaders() {
        return new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('id_token')}`);
    }
}