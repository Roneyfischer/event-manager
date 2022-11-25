
import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Ievent } from '../event-list/event-list-Interface';


@Component({
  selector: 'app-event-register',
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.css']
})
export class EventRegisterComponent {

  events:Ievent[] = [
    
   { id: 7,
    singularUserId: 38,
    singularEvent: "Teste com a Sátila",
    singularGroup: "anonimo, default, pastor",
    singularCategory: "Estudo",
    description: "Conferindo funcionamento do sistema",
    createDate: "2022-11-15T03:00:00.000Z",
    date: "2022-11-15T03:00:00.000Z",
    place: "Em casa",
    maxCapacityPerson: 2,
    subscriberNumber: 2,
    company: "company",
    eventStatus: "aberto"}

   ]

}
