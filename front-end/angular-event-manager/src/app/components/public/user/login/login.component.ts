import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IuserLogin } from './IuserLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private http: HttpClient) {}
  userCpf!: string;
  userPass!: string;

  user = {
    type: 'login',
    cpf: this.userCpf,
    pass: this.userPass,
  };

  submitUserLogin() {
    this.http
      .post('http://127.0.0.1:3333/auth', this.user)
      .subscribe((dados: any) => {
        const userLoginReturn: IuserLogin = dados;

        alert('Menssagem do sistema: ' + userLoginReturn.message);
      });
  }
}
