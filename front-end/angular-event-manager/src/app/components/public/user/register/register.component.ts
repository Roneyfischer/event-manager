import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  users = [
    {
      completeName: 'Nome completo',
      cpf: 'cpfffff0821921',
      email: 'emailll@gmail.com',
      group: 'group@gmail.com',
      role: 'role@gmail.com',
    },
    {
      completeName: '2 Nome completo',
      cpf: '2 cpfffff0821921',
      email: '2 emailll@gmail.com',
      group: '2 group@gmail.com',
      role: '2 role@gmail.com',
    },
    {
      completeName: 'Nome completo3',
      cpf: '3 cpfffff0821921',
      email: '3 emailll@gmail.com',
      group: '3 group@gmail.com',
      role: '3 role@gmail.com',
    },
  ];
}
