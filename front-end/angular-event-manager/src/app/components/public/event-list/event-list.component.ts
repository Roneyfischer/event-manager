import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { of } from 'rxjs';
import { Ievent, IeventList } from './event-list-Interface';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent {
  constructor(private http: HttpClient) {}

  offSet: number = 0;
  rowsNumberToReturn = 5;
  url = 'https://localhost:4200';

  // events!: Ievent[];

  fReadAllEvents(offsetRows: number, rowsNumberToReturn: number) {
    return {
      type: 'readAllEvents',
      offsetRows: this.offSet,
      rowsNumberToReturn: rowsNumberToReturn,
    };
  }

  ngOnInit() {
    console.log('estamos em init');

    this.loadEventList(this.offSet);
  }

  alterOffSet(number: number) {
    const newOffsetValue = this.offSet + number;
    console.log(this.offSet);
    if (newOffsetValue < 0) {
      this.offSet = 0;
      return this.loadEventList(this.offSet);
    }

    this.offSet = newOffsetValue;
    console.log(this.offSet);
    return this.loadEventList(this.offSet);
  }

  events!: Ievent[];

  loadEventList(offsetRows: number) {
    const teste = this.http.post(
      'http://127.0.0.1:3333/anonimousUser',
      this.fReadAllEvents(offsetRows, this.rowsNumberToReturn)
    );

    teste.subscribe((res: any) => {
      if (!res.executeRequisition.dataFinded) {
        this.offSet = this.offSet - 1;
        return this.loadEventList(this.offSet);
      }
      this.events = res.executeRequisition.dataFinded;
      return res.executeRequisition.dataFinded;
    });

    return teste;
  }

  loadEvents(offsetRows: number) {
    const teste = of(this.loadEventList(10));
    return teste;
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
// }
