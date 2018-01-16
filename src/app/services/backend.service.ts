import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BackendService {

  constructor(private _http: HttpClient, private _router: Router, private _auth: AuthService) { }

  getWallet(): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    return this._http.get(`http://localhost:53293/api/Wallet`, {headers: this.setHeader()})
  }

  updateWalletBalance(amountChanged: number): Observable<Object> {
    return this._http.put(`http://localhost:53293/api/Wallet?amount=${amountChanged}`, null, {headers: this.setHeader()})
  }

  private setHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }

  getWalletTransaction(): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    return this._http.get(`http://localhost:53293/api/WalletTransaction`, {headers: this.setHeader()})
  }

  getWalletTransactionById(id: number): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    return this._http.get(`http://localhost:53293/api/WalletTransaction/${id}`, {headers: this.setHeader()})
  }

  postWalletTransaction(amountChanged: number): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    return this._http.post(`http://localhost:53293/api/WalletTransaction`,{"TransactionAmount": amountChanged}, {headers: this.setHeader()})
  }

}