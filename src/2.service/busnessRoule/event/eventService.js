//Methods: create/save(ADD), EDIT and DELETE
//subscription, groups and category are party of userService.js

import dbMethod from "../../../1.model/DAL/dbMethod.js";

const eventService = {
  add: async (data) => {
    console.log("> [eventService.add]");
    //editar pra adicionar corretamente ao DB
    const singularEvent = data._singularEvent;
    const singulargroup = data._singularGroup;
    const singularCategory = data._singularCategory;
    const singularUserId = data._singularUserId;
    const description = data._description;
    const createDate = data._createDate;
    const date = data._date;
    const place = data._place;
    const maxCapacityPerson = data._maxCapacityPerson;
    const subscriberNumber = 0;

    const table = "events";

    const fieldName = `"singularEvent", 
    "singularGroup",
    "singularCategory",
    "description",
    "createDate",
    "date",
    "singularUserId",
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
      singularUserId,
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

  subscribe: async (reqBody) => {
    const table = "subscribers";
        const fieldName = `"singularUserId", "singularEvent", "subscriptionDate"`;
        const fieldValue = [reqBody.singularUserId, eventOnScreen.id, "2022/11/11"]
  },

  read: async (data) => {
    console.log("> [eventService.read]");

    const { table, nameItenToSearch, valueItenToSearch, itenToReturn } = data;
  

    const dataFinded = (
      await dbMethod.read(
        table,
        nameItenToSearch,
        valueItenToSearch,
        itenToReturn
      )
    );


    return dataFinded;
  },

  edit: async (reqBody) => {
    console.log("> [eventService.edit]");
    const { table, nameItenToSearch, valueItenToSearch, itenToReturn } =
      reqBody;
  },

  delete: async (reqBody) => {
    console.log("> [eventService.delete]");
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
