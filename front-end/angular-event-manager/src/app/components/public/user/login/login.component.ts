import { UserLoginService } from './../../../../service/user/userLogin/user-login.service';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private http: HttpClient,
    private userLoginService: UserLoginService
  ) {}
  userCpf!: string;
  userPass!: string;

  user = {
    type: 'login',
    cpf: this.userCpf,
    pass: this.userPass,
  };

  submitUserLogin() {
    this.userLoginService.userLogin(this.user);
  }
}
