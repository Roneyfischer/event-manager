import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ievent, IeventList } from './event-list-Interface';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent {
  constructor(private http: HttpClient) {}
  url = 'https://localhost:4200';

  events: Ievent[] = [];

  readAllEvents = {
    type: 'readAllEvents',
  };

  ngOnInit() {
    this.http
      .post('http://127.0.0.1:3333/anonimousUser', this.readAllEvents)
      .subscribe((res:any) => {const readAllEventReturn:IeventList = res.executeRequisition;
        const temporaryEvents:Ievent[] = readAllEventReturn.dataFinded
        console.log(temporaryEvents);
        this.events = temporaryEvents
      });
  }
}

// {
//   id: 7,
//   singularUserId: 38,
//   singularEvent: 'Teste com a Sátila',
//   singularGroup: 'anonimo, default, pastor',
//   singularCategory: 'Estudo',
//   description: 'Conferindo funcionamento do sistema',
//   createDate: '2022-11-15T03:00:00.000Z',
//   date: '2022-11-15T03:00:00.000Z',
//   place: 'Em casa',
//   maxCapacityPerson: 2,
//   subscriberNumber: 2,
//   company: 'company',
//   eventStatus: 'aberto',
// },
// {
//   id: 7,
//   singularUserId: 38,
//   singularEvent: 'Teste com a Sátila',
//   singularGroup: 'anonimo, default, pastor',
//   singularCategory: 'Estudo',
//   description: 'Conferindo funcionamento do sistema',
//   createDate: '2022-11-15T03:00:00.000Z',
//   date: '2022-11-15T03:00:00.000Z',
//   place: 'Em casa',
//   maxCapacityPerson: 2,
//   subscriberNumber: 2,
//   company: 'company',
//   eventStatus: 'aberto',
// },
// {
//   id: 7,
//   singularUserId: 38,
//   singularEvent: 'Teste com a Sátila',
//   singularGroup: 'anonimo, default, pastor',
//   singularCategory: 'Estudo',
//   description: 'Conferindo funcionamento do sistema',
//   createDate: '2022-11-15T03:00:00.000Z',
//   date: '2022-11-15T03:00:00.000Z',
//   place: 'Em casa',
//   maxCapacityPerson: 2,
//   subscriberNumber: 2,
//   company: 'company',
//   eventStatus: 'aberto',
// },
