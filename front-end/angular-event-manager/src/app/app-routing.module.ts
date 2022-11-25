import { LoginComponent } from './components/public/user/login/login.component';
import { EventListComponent } from './components/public/event-list/event-list.component';
import { RegisterComponent } from './components/public/user/register/register.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'userRegister',
    component: RegisterComponent,
  },
  { path: 'userLogin', component: LoginComponent },
  {
    path: '',
    component: EventListComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
