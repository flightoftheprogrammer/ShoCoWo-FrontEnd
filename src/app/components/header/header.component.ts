import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(public authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.authService.userInfo.subscribe((d: UserData) => {
      console.log('the value of data', d);
      this.username = d.user;
      this.isLoggedIn = d.isloggedin;
    });

    this.adminCheck();

    if (localStorage.getItem('id_token')) {
      this.isLoggedIn = true;
      this.username = localStorage.getItem('user');
    }
  }

  adminCheck() {
    this.authService.adminCheck().subscribe((result: boolean) => this.isAdmin = result)
  }

  logOut() {
    this.isLoggedIn = false;
    this.authService.logout();
    this.isAdmin = false;
    this._router.navigate(['/login']);
  }

}
export interface UserData {
  user: string;
  isloggedin: boolean;
}