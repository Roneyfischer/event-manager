import { IuserLoginReturn } from './../../../components/public/user/login/IuserLogin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  constructor(private http: HttpClient) {}
  userLogin(user: any) {
    this.http
      .post('http://127.0.0.1:3333/auth', user)
      .subscribe((dados: any) => {
        const userLoginReturn: IuserLoginReturn = dados;

        alert('Menssagem do sistema: ' + userLoginReturn.message);
      });
  }
}
