import { IuserRegister } from './../../../components/public/user/register/IuserRegister';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import variables from 'src/app/environment/variables';

@Injectable({
  providedIn: 'root',
})
export class UserRegisterService {
  constructor(private http: HttpClient) {}

  userRegister(user: any): void {
    this.http
      .post(`${variables.ApiUrl}/auth`, user)
      .subscribe((dados: any) => {
        console.log(dados);
        const userLoginReturn: IuserRegister = dados;

        alert('Menssagem do sistema: ' + userLoginReturn.message);
      });
  }
}
