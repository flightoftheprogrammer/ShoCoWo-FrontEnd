import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../services/admin.service';

@Component({
  providers: [AdminService],
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any;

  constructor(private _http: HttpClient, private _router: Router, private _admin: AdminService) { }

  ngOnInit() {
    this._admin.getAllUsers().subscribe(result => this.users = result)
  }

}
