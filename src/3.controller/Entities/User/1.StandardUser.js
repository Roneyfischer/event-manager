//////////////////////////////////////////////////////////////
////////////////////////   ATENÇÃO:   ////////////////////////
//  Esta classe é herdada por outras classes de usuários.   //
//////////////////////////////////////////////////////////////

import userValidations from "../../valitadtion/loginRegister/userRegisterDataValidation.js";
import userLoginDataValidation from "../../valitadtion/loginRegister/userLoginDataValidation.js";
import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import EventController from "../Event/Event.js";
import cryptography from "../../../2.service/busnessRoule/crypto/cryptoOperator.js";
import userService from "../../../2.service/busnessRoule/user/userService.js";
import dbMethod from "../../../1.model/DAL/dbMethod.js";

import chalk from "chalk";
// import AnonimousUser from "./0.AnonimousUser.js";
// import groupAndCategoryValdiation from "../../valitadtion/groupAndCategory/groupAndCategoryValdiation.js";

class StandardUser {
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

  filterEvent = async (reqBody) => {
    console.log("> [AnonimousUser.filter]");

    const eventController = new EventController();
    return await eventController[reqBody.type](reqBody);
  };

  filterGroup = async (reqBody) => {
    console.log("> [AnonimousUser.filter]");
    const eventController = new EventController();
    return await eventController[reqBody.type](reqBody);
  };
  filterCategory = async (reqBody) => {
    console.log("> [AnonimousUser.filter]");
    const eventController = new EventController();
    return await eventController[reqBody.type](reqBody);
  };

  register = async (reqBody) => {
    console.log("> [StandardUser.register]");
    try {
      const dataValidation = userValidations.inputsValidation(reqBody);

      if (dataValidation.status) {
        let reqBodyTemporary = reqBody;
        reqBodyTemporary.role = "standard";
        const reqBodyNew = reqBodyTemporary;

        return await userService.register(reqBodyNew);
      } else {
        throw dataValidation;
      }
    } catch (error) {
      return errorHandling(error);
    }
  };

  login = async (reqBody) => {
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

  deleteMyUser = async (reqBody) => {
    return await userService.delete(reqBody);
  };

  editPass = async (reqBody) => {
    console.log("> [StandardUser.editPass]");
    try {
      const { cpf, pass, newPass, newPassConfirmation } = reqBody;

      const checkDataMatch = userValidations.checkDataMatch(newPass, newPassConfirmation);

      if (checkDataMatch.status) {
        const executeLogin = await this.login(reqBody);
        const userOnScreen = executeLogin.dataFinded;
        if (executeLogin.status) {
          return updatePass(userOnScreen);
        }
        return executeLogin;
      }
      return checkDataMatch;

      async function updatePass(userOnScreen) {
        const passEncrypted = await cryptography.cryptoArgon2.encrypt(newPass);
        const table = "users";
        const nameItenToSearch = "id";
        const valueItenToSearch = [userOnScreen.id];
        const nameItenToUpdate = "pass";
        const valueItenToUpdate = [passEncrypted];

        return await userService.update(table, nameItenToSearch, valueItenToSearch, nameItenToUpdate, valueItenToUpdate);
      }
    } catch (error) {
      return errorHandling(error);
    }
  };

  editEmail = async (reqBody) => {
    console.log("> [StandardUser.editEmail]");
    try {
      const { cpf, pass, newEmail, newEmailConfirmation } = reqBody;

      const checkDataMatch = userValidations.checkDataMatch(newEmail, newEmailConfirmation);

      if (checkDataMatch.status) {
        const executeLogin = await this.login(reqBody);
        const userOnScreen = executeLogin.dataFinded;

        if (executeLogin.status) {
          return updateEmail(userOnScreen);
        }
        return executeLogin;
      }
      return checkDataMatch;

      async function updateEmail(userOnScreen) {
       
        const table = "users";
        const nameItenToSearch = "id";
        const valueItenToSearch = [userOnScreen.id];
        const nameItenToUpdate = "email";
        const valueItenToUpdate = [newEmail];

        return userService.update(table, nameItenToSearch, valueItenToSearch, nameItenToUpdate, valueItenToUpdate);
      }
    } catch (error) {
      return errorHandling(error);
    }
  };

  selfFilter = async (reqBody) => {
    const data = {};
    data.table = "users";
    data.nameItenToSearch = "id";
    data.valueItenToSearch = [reqBody.singularUserId];
    data.itenToReturn = `*`;

    const dataFinded = await userService.read(data);

    return dataFinded;
  };
}

export default StandardUser;
