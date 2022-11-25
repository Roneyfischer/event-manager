export interface IeventList {
  status: boolean;
  message: string;
  dataFinded: Ievent[];
}

export type Ievent = {
  id: number;
  singularUserId: number;
  singularEvent: string;
  singularGroup: string;
  singularCategory: string;
  description: string;
  createDate: any;
  date: any;
  place: string;
  maxCapacityPerson: number;
  subscriberNumber: number;
  company: string;
  eventStatus: string;
}
