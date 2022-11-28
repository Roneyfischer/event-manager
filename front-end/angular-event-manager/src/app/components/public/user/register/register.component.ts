import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { json } from 'express';
import { IuserRegister } from './IuserRegister';
import { UserRegisterService } from 'src/app/service/user/userRegister/user-register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private userRegisterService: UserRegisterService) {}
  
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
    this.userRegisterService.userRegister(this.user)
  }
  userRegisterInputClean(): void {

  }
}
