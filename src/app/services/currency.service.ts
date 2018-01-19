import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

const Api_Url = 'http://shocowo.apphb.com'

@Injectable()
export class CurrencyService {

  constructor(private _http: HttpClient, private _router: Router, private _auth: AuthService) { }

  getCurrencies(): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    return this._http.get(`${Api_Url}/api/Currency`, {headers: this.setHeader()})
  }
  
  addCurrency(currencyNameL: string, currencyNameS: string): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    return this._http.post(`${Api_Url}/api/Currency`,{"CurrencyNameLong": currencyNameL, "CurrencyName": currencyNameS }, {headers: this.setHeader()})
  }

  private setHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }

  getCurrencyId(id: number): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    return this._http.get(`${Api_Url}/api/Currency/${id}`, {headers: this.setHeader()})
  }

}
