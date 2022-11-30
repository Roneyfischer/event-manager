import variables from 'src/app/environment/variables';
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
      .post(`${variables.ApiUrl}/auth`, user)
      .subscribe((dados: any) => {
        const userLoginReturn: IuserLoginReturn = dados;
        console.log(userLoginReturn);

        return userLoginReturn;
      });
  }
}
