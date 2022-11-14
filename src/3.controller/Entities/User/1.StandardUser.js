//////////////////////////////////////////////////////////////
////////////////////////   ATENÇÃO:   ////////////////////////
//  Esta classe é herdada por outras classes de usuários.   //
//////////////////////////////////////////////////////////////

import userRegisterDataValidation from "../../valitadtion/loginRegister/userRegisterDataValidation.js";
import userLoginDataValidation from "../../valitadtion/loginRegister/userLoginDataValidation.js";
import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import EventController from "../Event/Event.js";

import userService from "../../../2.service/busnessRoule/user/userService.js";

import chalk from "chalk";
import AnonimousUser from "./0.AnonimousUser.js";
import groupAndCategoryValdiation from "../../valitadtion/groupAndCategory/groupAndCategoryValdiation.js";

class StandardUser {
  // início composição:
  readAllEvents = async (reqBody) => {
    console.log("> [AnonimousUser.readAll]");

    const eventController = new EventController();
    return await eventController[reqBody.type]();
  };
  readAllGroups = async (reqBody) => {
    console.log("> [AnonimousUser.readAll]");

    const eventController = new EventController();
    return await eventController[reqBody.type]();
  };
  readAllCategories = async (reqBody) => {
    console.log("> [AnonimousUser.readAll]");

    const eventController = new EventController();
    return await eventController[reqBody.type]();
  };

  readEvent = async (reqBody) => {
    console.log("> [AnonimousUser.filter]");
    const anonimousUser = new AnonimousUser();
    return await anonimousUser[reqBody.type](reqBody);
  };

  readGroup = async (reqBody) => {
    console.log("> [AnonimousUser.filter]");
    const anonimousUser = new AnonimousUser();
    return await anonimousUser[reqBody.type](reqBody);
  };
  readCategories = async (reqBody) => {
    console.log("> [AnonimousUser.filter]");
    const anonimousUser = new AnonimousUser();
    return await anonimousUser[reqBody.type](reqBody);
  };

  //fim composição

  register = async (reqBody) => {
    console.log("> [StandardUser.register]");
    try {
      const dataValidation = userRegisterDataValidation(reqBody);

      if (dataValidation.status) {
        return await userService.register(reqBody);
      } else {
        throw dataValidation;
      }
    } catch (error) {
      return errorHandling(error);
    }
  };

  login = async (reqBody, res) => {
    console.log("> [StandardUser.login]");
    try {
      //se houver erro na validação, o "userLoginDataValidation" lança/throw erro,
      //e o CATH desta função retorna para o console e frontEnd
      const dataValidation = userLoginDataValidation(reqBody);

      if (dataValidation.status) {
        return await userService.login(reqBody);
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };

  logout = async (reqBody, res) => {
    console.log("> [StandardUser.logout]");
  };

  authorization = async (reqBody) => {
    console.log("> [StandardUser.authorization]");
    try {
    } catch (error) {
      return errorHandling(error);
    }
  };

  deleteMyUser = async (reqBody) => {
    return await userService.delete(reqBody);

    throw new Error();
  };

  edit = async (reqBody) => {
    console.log("> [StandardUser.edit]");
    try {
    } catch (error) {
      return errorHandling(error);
    }
  };
}

export default StandardUser;
