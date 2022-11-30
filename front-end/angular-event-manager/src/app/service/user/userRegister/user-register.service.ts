import { IuserRegister } from './../../../components/public/user/register/IuserRegister';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserRegisterService {
  constructor(private http: HttpClient) {}

  userRegister(user: any): void {
    this.http
      .post('https://fischerserver.shop/auth', user)
      .subscribe((dados: any) => {
        console.log(dados);
        const userLoginReturn: IuserRegister = dados;

        alert('Menssagem do sistema: ' + userLoginReturn.message);
      });
  }
}
