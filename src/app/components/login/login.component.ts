import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private _form: FormBuilder, private authService: AuthService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this._form.group({
      email: new FormControl,
      password: new FormControl
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value);
  }

}
