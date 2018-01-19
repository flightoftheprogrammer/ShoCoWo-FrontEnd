import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

const Api_Url = 'http://shocowo.apphb.com'

@Injectable()
export class HoldingService {

  constructor(private _http: HttpClient, private _router: Router) { }

  getHoldings(): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    return this._http.get(`${Api_Url}/api/Holding`, { headers: this.setHeader() } );
  }

  getHolding(holdingId: number): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    return this._http.get(`${Api_Url}/api/Holding`, { headers: this.setHeader() } );
  }

  getHoldingByCurrencyId(currencyId: number): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    return this._http.get(`${Api_Url}/api/Holding?currencyId=${currencyId}`, { headers: this.setHeader() } );
  }

  postHoldingTransaction(holdingId: number, cryptoTransactionAmount: number, marketValue: number): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    return this._http.post(`${Api_Url}/api/HoldingTransaction`, {"HoldingId": holdingId, "CryptoTransactionAmount": cryptoTransactionAmount, "MarketValue": marketValue} , { headers: this.setHeader() } );
  }

  getHoldingTransactions(holdingId: number): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    return this._http.get(`${Api_Url}/api/HoldingTransaction/${holdingId}`, { headers: this.setHeader() } );
  }

  private setHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }
}
