import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service'
import { Observable } from 'rxjs/Observable';

const Api_Url = 'http://shocowo.apphb.com'

@Injectable()
export class BackendService {

  constructor(private _http: HttpClient, private _router: Router, private _auth: AuthService) { }

  getWallet(): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    return this._http.get(`${Api_Url}/api/Wallet`, {headers: this.setHeader()})
  }

  updateWalletBalance(amountChanged: number): Observable<Object> {
    return this._http.put(`${Api_Url}/api/Wallet?amount=${amountChanged}`, null, {headers: this.setHeader()})
  }

  private setHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }

  getWalletTransaction(): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    return this._http.get(`${Api_Url}/api/WalletTransaction`, {headers: this.setHeader()})
  }

  getWalletTransactionById(id: number): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    return this._http.get(`${Api_Url}/api/WalletTransaction/${id}`, {headers: this.setHeader()})
  }

  postWalletTransaction(amountChanged: number): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    return this._http.post(`${Api_Url}/api/WalletTransaction`,{"TransactionAmount": amountChanged}, {headers: this.setHeader()})
  }

}