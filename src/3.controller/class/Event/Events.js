import eventService from "../../../2.service/busnessRoule/event/eventService.js";
import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import eventCreateDataValidation from "../../valitadtion/event/eventCreateDataValidation.js";
import eventReadValidation from "../../valitadtion/event/eventReadValidation.js"
export default class Event {
  constructor(data) {
    const {
      singularEvent,
      singularGroup,
      singularCategory,
      description,
      createDate,
      date,
      singularUser,
      place,
      maxCapacityPerson,
    } = data;

    this._id = null;
    this._singularEvent = singularEvent;
    this._singularGroup = singularGroup;
    this._singularCategory = singularCategory;
    this._description = description;
    this._createDate = createDate;
    this._date = date;
    this._singularUser = singularUser;
    this._place = place;
    this._maxCapacityPerson = maxCapacityPerson;
    this._subscriberNumber = 0;
    this._subscribers = 0;
    this._allData = [
      this._singularEvent,
      this._singularGroup,
      this._singularCategory,
      this._description,
      this._createDate,
      this._date,
      this._singularUser,
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
    try {    
      
    const dataValidation = eventReadValidation(data)

    if(dataValidation) {

      return eventService.read(data)
    }throw dataValidation
    
  } catch (error) {
      
  }
  };

  // subscribre = (data) => {
  //   const { userCpf, pass } = data;
  // };

  // unsubscribre = (data) => {
  //   const { userCpf, pass } = data;
  // };

  cancel = (data) => {
    const { userCpf, pass } = data;
  };

  delete = (data) => {
    const { userCpf, pass } = data;
  };

  get singularEvent() {
    return this._singularEvent;
  }
  get singularGroup() {
    return this._singularGroup;
  }
  get singularCategory() {
    return this._singularCategory;
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
  get singularUser() {
    return this._singularUser;
  }
  get place() {
    return this._place;
  }
  get maxCapacityPerson() {
    return this._maxCapacityPerson;
  }

  set singularEvent(data) {
    this._singularEvent;
  }
  set singularGroup(data) {
    this._singularGroup;
  }
  set singularCategory(data) {
    this._singularCategory;
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
  set singularUser(data) {
    this._singularUser;
  }
  set place(data) {
    this._place;
  }
  set maxCapacityPerson(data) {
    this._maxCapacityPerson;
  }
}
