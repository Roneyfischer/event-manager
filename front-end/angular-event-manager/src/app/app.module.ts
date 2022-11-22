import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventRegisterComponent } from './components/public/event-register/event-register.component';
import { EventListComponent } from './components/public/event-list/event-list.component';
import { NavbarPublicComponent } from './components/public/navbar-public/navbar-public.component';
import { RegisterComponent } from './components/public/user/register/register.component';
import { LoginComponent } from './components/public/user/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    EventRegisterComponent,
    EventListComponent,
    NavbarPublicComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
