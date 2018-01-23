import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const Api_Url = 'http://shocowo.azurewebsites.net'
@Injectable()
export class AdminService {

  constructor(private _http: HttpClient, private _router: Router) { }

  getAllUsers(): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)) }

    return this._http.get(`${Api_Url}/api/Account/GetUsers`, { headers: this.setHeader() } );
  }

  private setHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }
}
