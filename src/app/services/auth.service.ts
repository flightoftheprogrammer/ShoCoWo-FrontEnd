import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/RegisterUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { encode } from '@angular/router/src/url_tree';
import { Token } from '../models/Token';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

const Api_Url = 'http://shocowo.apphb.com'

@Injectable()
export class AuthService {
  userInfo = new Subject<{}>();
  isLoggedIn = new Subject<boolean>();

  constructor( private _http: HttpClient, private _router: Router) { }

  register(regUserData: RegisterUser) {
    return this._http.post(`${Api_Url}/api/Account/Register`, regUserData);
  }

  login(loginInfo) {
    const str = 
      `grant_type=password&username=${encodeURI(loginInfo.email)}&password=${encodeURI(loginInfo.password)}`;
    
      return this._http.post(`${Api_Url}/token`, str).subscribe( (token: Token) => {
      localStorage.setItem('id_token', token.access_token);
      localStorage.setItem('user', token.userName);

      this.isLoggedIn.next(true);
      window.location.reload();
      this._router.navigate(['/home']);
    });
  }

  currentUser(): Observable<Object> {
    if (!localStorage.getItem('id_token')) { return new Observable(observer => observer.next(false)); }

    return this._http.get(`${Api_Url}/api/Account/UserInfo`, { headers: this.setHeader() } );
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn.next(false);

     this._http.post(`${Api_Url}/api/Account/Logout`, { headers: this.setHeader() } );
     this._router.navigate(['/login']);
  }

  private setHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }

}
