//Methods: create/save(ADD), EDIT and DELETE
//subscription, groups and category are party of userService.js

import dbMethod from "../../../1.model/DAL/dbMethod.js";

const eventService = {
  add: async (data) => {
    console.log("> [eventService.add]");
    const {
      singularEvent,
      singularGroup,
      singularCategory,
      singularUserId,
      description,
      createDate,
      date,
      place,
      subscriberNumber,
      maxCapacityPerson,
      eventStatus,
      company,
    } = data;

    const table = "events";

    const fieldName = `
    "singularEvent", 
    "singularGroup",
    "singularCategory",
    "description",
    "createDate",
    "date",
    "singularUserId",
    "place",
    "maxCapacityPerson",
    "subscriberNumber",
    "company",
    "eventStatus"`;
    const fieldValue = [
      singularEvent,
      singularGroup,
      singularCategory,
      description,
      createDate,
      date,
      singularUserId,
      place,
      maxCapacityPerson,
      subscriberNumber,
      company,
      eventStatus,
    ];

    const returnAddDb = await dbMethod.add(table, fieldName, fieldValue);
    //pode retornar "_id _subscriberNumber, _subscribers" em uma read do DB, msa não precisa na etapa de criação.
    return {
      status: true,
      message: returnAddDb.message,
    };
  },

  subscribersAdd: async (reqBody, eventOnScreen, userToEvent) => {
    const dateNow = new Date().toISOString();
    console.log(dateNow);
    const table = "subscribers";
    const fieldName = `"singularUserId", "completeName", "singularEventId", "singularEvent", "subscriptionDate"`;
    const fieldValue = [
      userToEvent.id,
      userToEvent.completeName,
      eventOnScreen.id,
      eventOnScreen.singularEvent,
      dateNow,
    ];
    return await dbMethod.add(table, fieldName, fieldValue);
  },
  subscribersDelete: async (
    table,
    nameItenToDeleteLine,
    valueItenToDeleteLine
  ) => {
    return dbMethod.delete(table, nameItenToDeleteLine, valueItenToDeleteLine);
  },

  update: async (
    table,
    nameItenToSearch,
    valueItenToSearch,
    nameItenToUpdate,
    valueItenToUpdate
  ) => {
    return dbMethod.update(
      table,
      nameItenToSearch,
      valueItenToSearch,
      nameItenToUpdate,
      valueItenToUpdate
    );
  },

  read: async (data) => {
    const { table, nameItenToSearch, valueItenToSearch, itenToReturn } = data;
    

    const dataFinded = await dbMethod.read(
      table,
      nameItenToSearch,
      valueItenToSearch,
      itenToReturn
    );

    return dataFinded;
  },
  
  readAll: async (data) => {
    
    return await dbMethod.readAll(data);
  },
  
  readAllLimitedByRowNumber:async(data){
    const {table, rowsNumberToReturn, offsetRows} = data;
    return await dbMethod.readAllLimitedByRowNumber(table, rowsNumberToReturn, offsetRows)
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
