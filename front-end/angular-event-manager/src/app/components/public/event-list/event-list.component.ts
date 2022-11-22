import { Component } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent {
  temporaryDescription = `Hic dolorem nemo et odit suscipit rem laboriosam deleniti qui voluptas asperiores et autem beatae qui distinctio necessitatibus id numquam dignissimos. Et galisum numquam rem consectetur minima non exercitationem optio. Sit consequatur nobis et minima vitae qui tempore perferendis est necessitatibus dolores. Eum mollitia facere et dolore culpa et aliquid labore. A itaque omnis et sunt velit et illo. Est voluptatum!`;
  url = 'https://localhost:4200';
  events = [
    {
      name: `Evento 01`,
      liteDescription: this.temporaryDescription,
      category: `Educação`,
      group: `pastores`,
      date: '25/11/2022',
      createDate: '25/11/2022',
      status: `aguardando`,
      link: `https://google.com`,
    },
    {
      name: `Evento 01`,
      liteDescription: this.temporaryDescription,
      category: `Educação`,
      group: `pastores`,
      date: '25/11/2022',
      createDate: '25/11/2022',
      status: `aguardando`,
      link: `https://google.com`,
    },
    {
      name: `Evento 01`,
      liteDescription: this.temporaryDescription,
      category: `Educação`,
      group: `pastores`,
      date: '25/11/2022',
      createDate: '25/11/2022',
      status: `aguardando`,
      link: `https://google.com`,
    },
  ];
}
