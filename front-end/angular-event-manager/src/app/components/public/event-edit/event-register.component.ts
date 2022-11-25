
import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Ievent } from '../event-list/event-list-Interface';


@Component({
  selector: 'app-event-register',
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.css']
})
export class EventRegisterComponent {

  events!:Ievent[]

}
