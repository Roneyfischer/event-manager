import eventService from "../../../2.service/busnessRoule/event/eventService.js";
import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import eventCreateDataValidation from "../../valitadtion/event/eventCreateDataValidation.js";
import eventReadValidation from "../../valitadtion/event/eventReadValidation.js";

export default class Event {
  //alterar para EventController
  constructor(reqBody) {}
  add = (reqBody) => {
    try {
      const {
        singularEvent,
        singularGroup,
        singularCategory,
        singularUserId,
        description,
        createDate,
        date,
        place,
        maxCapacityPerson,
      } = reqBody;

      this._id = null;
      this._singularEvent = singularEvent;
      this._singularGroup = singularGroup;
      this._singularCategory = singularCategory;
      this._description = description;
      this._createDate = createDate;
      this._date = date;
      this._singularUserId = singularUserId;
      this._place = place;
      this._maxCapacityPerson = maxCapacityPerson;
      this._subscriberNumber = 0;
      this._subscribers = 0;

      const dataValidation = eventCreateDataValidation(this);
      if (dataValidation.status) {
        const returnAdd = eventService.add(this);

        return returnAdd;
      }
      throw erorr;
    } catch (error) {
      return errorHandling(error);
    }
  };

  read = (reqBody) => {
    console.log("[Event.readEvents]" + reqBody);

    return eventService.read(reqBody);
  };

  subscribe = async (reqBody) => {
    try {
      let reqBodyNew = reqBody;
      reqBodyNew.table = "events";
      reqBodyNew.nameItenToSearch = "id";
      reqBodyNew.valueItenToSearch = [reqBody.singularEventId];
      reqBodyNew.itenToReturn = "*";

      const eventOnScreen = (await this.read(reqBodyNew)).dataFinded;

      if (eventOnScreen.subscriberNumber < eventOnScreen.maxCapacityPerson) {
        let dataToGetUserName = {};
        dataToGetUserName.table = "users";
        dataToGetUserName.nameItenToSearch = "id";
        dataToGetUserName.valueItenToSearch = [reqBody.singularUserId];
        dataToGetUserName.itenToReturn = `"singularUser"`;
        const singularUserToEvent = (await this.read(dataToGetUserName))
          .dataFinded.singularUser;

        await eventService
          .subscribe(reqBody, eventOnScreen, singularUserToEvent)
          .then(async (res) => {
            if (res.status) {
              const subscriberNumber = parseInt(eventOnScreen.subscriberNumber);
              const table = "events";
              const nameItenToSearch = "id";
              const valueItenToSearch = reqBody.singularEventId;
              const nameItenToUpdate = "subscriberNumber";
              const valueItenToUpdate = [subscriberNumber + 1];
              //se não for possível adicionar, tem que reverter o subscribe em subscribers;
              await eventService.update(
                table,
                nameItenToSearch,
                valueItenToSearch,
                nameItenToUpdate,
                valueItenToUpdate
              );
              console.log("log: Inscrição realizada com sucesso");
              return { msg: "Inscrição realizada com sucesso." };
            }
          })
          .catch((err) => {
            throw { msg: "Ops, você já está inscrito neste evento." };
          });
      }
      throw { msg: "Ops, já foi atingido o número máximo de inscritos." };
    } catch (error) {
      return errorHandling(error);
    }
  };

  edit = async (reqBody) => {};

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

  // get singularEvent() {
  //   return this._singularEvent;
  // }
  // get singularGroup() {
  //   return this._singularGroup;
  // }
  // get singularCategory() {
  //   return this._singularCategory;
  // }
  // get description() {
  //   return this._description;
  // }
  // get createDate() {
  //   return this._createDate;
  // }
  // get date() {
  //   return this._date;
  // }
  // get singularUser() {
  //   return this._singularUser;
  // }
  // get place() {
  //   return this._place;
  // }
  // get maxCapacityPerson() {
  //   return this._maxCapacityPerson;
  // }

  // set singularEvent(data) {
  //   this._singularEvent;
  // }
  // set singularGroup(data) {
  //   this._singularGroup;
  // }
  // set singularCategory(data) {
  //   this._singularCategory;
  // }
  // set description(data) {
  //   this._description;
  // }
  // set createDate(data) {
  //   this._createDate;
  // }
  // set date(data) {
  //   this._date;
  // }
  // set singularUser(data) {
  //   this._singularUser;
  // }
  // set place(data) {
  //   this._place;
  // }
  // set maxCapacityPerson(data) {
  //   this._maxCapacityPerson;
  // }
}
