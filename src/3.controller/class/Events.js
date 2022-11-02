import eventService from "../../2.service/busnessRoule/event/eventService.js";
import errorHandling from "../../2.service/errorHandling/errorHandling.js";
import eventCreateDataValidation from "../valitadtion/event/eventCreateDataValidation.js";
export default class Event {
  constructor(data) {
    const {
      name,
      group,
      category,
      description,
      createDate,
      date,
      author,
      place,
      maxCapacityPerson,
    } = data;

    this._id = null;
    this._name = name;
    this._group = group;
    this._category = category;
    this._description = description;
    this._createDate = createDate;
    this._date = date;
    this._author = author;
    this._place = place;
    this._maxCapacityPerson = maxCapacityPerson;
    this._subscriberNumber = 0;
    this._subscribers = 0;
    this._allData = [
      this._name,
      this._group,
      this._category,
      this._description,
      this._createDate,
      this._date,
      this._author,
      this._place,
      this._maxCapacityPerson,
    ];
  }
  firstSave = () => {
    try {
      console.log("valor aqui: " + this.group);
      const dataValidation = eventCreateDataValidation(this);
      if (dataValidation.status) {
        //aguarda um retorno {status: true/false, message: `msg here`, id: ${id}, subscriberNumber: ${subscriberNumber}, subscribers: ${subscribers}}
        const returnFirstSave = eventService.firstSave(this);
        // this._id(returnFirstSave.id);
        // this._subscriberNumber(returnFirstSave.subscriberNumber);
        // this._subscribers(returnFirstSave.subscribers);
        return returnFirstSave;
      }
      throw erorr;
    } catch (error) {
      return errorHandling(error);
    }
  };

  read = (data) => {
    const { name, id } = data;
  };

  subscribre = (data) => {
    const { userCpf, pass } = data;
  };

  unsubscribre = (data) => {
    const { userCpf, pass } = data;
  };

  cancel = (data) => {
    const { userCpf, pass } = data;
  };

  delet = (data) => {
    const { userCpf, pass } = data;
  };

  get name() {
      return this._name;
    }
  get group() {
    return this._group;
  }
  get category() {
    return this._category;
  }
  get description() {
    return this._description;
  }
  get createDate() {
    return this._createDate;
  }
  get date() {
    return this._date;
  }
  get author() {
    return this._author;
  }
  get place() {
    return this._place;
  }
  get maxCapacityPerson() {
    return this._maxCapacityPerson;
  }

  set name(data) {
    this._name;
  }
  set group(data) {
    this._group;
  }
  set category(data) {
    this._category;
  }
  set description(data) {
    this._description;
  }
  set createDate(data) {
    this._createDate;
  }
  set date(data) {
    this._date;
  }
  set author(data) {
    this._author;
  }
  set place(data) {
    this._place;
  }
  set maxCapacityPerson(data) {
    this._maxCapacityPerson;
  }
}
