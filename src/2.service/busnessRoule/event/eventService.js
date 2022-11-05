//Methods: create/save(ADD), EDIT and DELETE
//subscription, groups and category are party of userService.js

import dbMethod from "../../../1.model/dbMethods/dbMethod.js";

const eventService = {

  add: async (data) => {
    //editar pra adicionar corretamente ao DB
    const singularEvent = data.singularEvent;
    const singulargroup = data.singularGroup;
    const singularCategory = data.singularCategory;
    const description = data.description;
    const createDate = data.createDate;
    const date = data.date;
    const singularUser = data.singularUser;
    const place = data.place;
    const maxCapacityPerson = data.maxCapacityPerson;
    const subscriberNumber = 0;


    const table = "events";

    const fieldName = `"singularEvent", 
    "singularGroup",
    "singularCategory",
    "description",
    "createDate",
    "date",
    "singularUser",
    "place",
    "maxCapacityPerson",
    "subscriberNumber"`;
    const fieldValue = [
      singularEvent,
      singulargroup,
      singularCategory,
      description,
      createDate,
      date,
      singularUser,
      place,
      maxCapacityPerson,
      subscriberNumber,
    ];

    const returnAddDb = await dbMethod.add(table, fieldName, fieldValue);
    //pode retornar "_id _subscriberNumber, _subscribers" em uma read do DB, msa não precisa na etapa de criação.
    return {
      status: true,
      message: returnAddDb.message,
    };
  },
  //    read = (data) => {
  //      { eventName, eventId } = data;
  //   };
  read: async (reqBody) => {
    const { table, nameItenToSearch, valueItenToSearch, itenToReturn } =
      reqBody;
  },

  edit: async (reqBody) => {
    const { table, nameItenToSearch, valueItenToSearch, itenToReturn } =
      reqBody;
  },

  delete: async (reqBody) => {
    const { table, nameItenToSearch, valueItenToSearch, itenToReturn } =
      reqBody;
  },

  //    cancel = (data) => {
  //      { userCpf, pass } = data;
  //   };

  //    delet = (data) => {
  //      { userCpf, pass } = data;
  //   };

  //    eventName = (data) => {
  //     this.eventName;
  //   };
  //    eventGroup = (data) => {
  //     this.eventGroup;
  //   };
  //    eventCategory = (data) => {
  //     this.eventCategory;
  //   };
  //    eventDescription = (data) => {
  //     this.eventDescription;
  //   };
  //    eventCreateDate = (data) => {
  //     this.eventCreateDate;
  //   };
  //    eventDate = (data) => {
  //     this.eventDate;
  //   };
  //    eventAuthor = (data) => {
  //     this.eventAuthor;
  //   };
  //    eventPlace = (data) => {
  //     this.eventPlace;
  //   };
  //    maxCapacityPersonEvent = (data) => {
  //     this.maxCapacityPersonEvent;
  //   };
};

export default eventService;