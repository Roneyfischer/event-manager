///////////////////////////////////////////////////////////////////
/////////////////////////   ATENÇÃO:   ////////////////////////////
// Esta classe é herdada por outra(s) classe(s) de usuário(s).   //
///////////////////////////////////////////////////////////////////

import StandardUser from "./1.StandardUser.js";
import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import chalk from "chalk";
import userService from "../../../2.service/busnessRoule/user/userService.js";
import Event from "../Event/Event.js";

class GuestUser extends StandardUser {
 
  subscribe = async (reqBody) => {
    console.log("> [GuestUser.subscribe]")
    const event = new Event();
    try {
      const table = "events";
      const nameItenToSearch = "singularEvent";
      const valueItenToSearch = reqBody.singularEvent;
      const itenToReturn = "*";

      const eventOnScreen = event.read(
        table,
        nameItenToSearch,
        valueItenToSearch,
        itenToReturn
      );
      if (eventOnScreen.subscriberNumber < eventOnScreen.maxCapacityPerson) {
        const table = "subscribers";
        const fieldName = `"subscriberNumber"`;
        const fieldValue = [eventOnScreen.subscriberNumber + 1];

        return {
          subscprition: await event.subscribe(reqBody),
          newSubscriberNumber: event.edit(table, fieldName, fieldValue),
        };
      }
      throw { msg: "Ops, já foi atingido o número máximo de inscritos." };
    } catch (error) {
      return errorHandling(error);
    }
  };

  unsubscribe = async (reqBody) => {
    console.log("> [GuestUser.unsubscribe]")
    const event = new Event();
    subscribe = async (reqBody) => {
      try {
        return await event.unsubscribe(reqBody);
      } catch (error) {
        return errorHandling(error);
      }
    };
  };
}

export default GuestUser;
