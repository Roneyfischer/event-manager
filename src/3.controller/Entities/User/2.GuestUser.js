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
    console.log("> [GuestUser.subscribe]");

    //
    const event = new Event();
    const subscribeEnvet = await event.subscribe(reqBody);
 
    console.log(subscribeEnvet);
    return subscribeEnvet;
  };

  unsubscribe = async (reqBody) => {
    console.log("> [GuestUser.unsubscribe]");
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
