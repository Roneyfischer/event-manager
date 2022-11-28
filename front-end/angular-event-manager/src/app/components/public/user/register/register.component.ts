import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { json } from 'express';
import { IuserRegister } from './IuserRegister';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private http: HttpClient) {}
  completeName!: string;
  cpf!: number;
  email!: string;

  pass!: string;
  passConfirmation!: string;

  user = {
    type: 'register',
    completeName: this.completeName,
    cpf: this.cpf,
    email: this.email,
    pass: this.pass,
    passConfirmation: this.passConfirmation,
  };

  submitUserRegister(): void {
    this.http
      .post('http://127.0.0.1:3333/auth', this.user)
      .subscribe((dados: any) => {
        console.log(dados);
        const userLoginReturn: IuserRegister = dados;

        alert('Menssagem do sistema: ' + userLoginReturn.message);
      });
  }
  userRegisterInputClean(): void {}
}
