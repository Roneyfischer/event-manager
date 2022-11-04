//////////////////////////////////////////////////////////////
////////////////////////   ATENÇÃO:   ////////////////////////
//  Esta classe é herdada por outras classes de usuários.   //
//////////////////////////////////////////////////////////////

import userRegisterDataValidation from "../../valitadtion/user/userRegisterDataValidation.js";
import userLoginDataValidation from "../../valitadtion/user/userLoginDataValidation.js";
import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import chalk from "chalk";
import userService from "../../../2.service/busnessRoule/user/userService.js";

class BasicUser {
  register = async (reqBody) => {
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
    try {
      //se houver erro na validação, o "userLoginDataValidation" lança/throw erro,
      //e o CATH desta função retorna para o console e frontEnd
      const dataValidation = userLoginDataValidation(reqBody);

      if (dataValidation.status) {
        console.log(
          chalk.blue.bold.italic((await userService.login(reqBody)).message)
        );
        return await userService.login(reqBody);
      } else {
        throw dataValidation;
      }
    } catch (error) {
      return errorHandling(error);
    }
  };

  logout = async (reqBody, res) => {};

  authorization = async (reqBody) => {
    try {
    } catch (error) {
      return errorHandling(error);
    }
  };

  delete = async (reqBody) => {
    try {
    } catch (error) {
      return errorHandling(error);
    }
  };

  edit = async (reqBody) => {
    try {
    } catch (error) {
      return errorHandling(error);
    }
  };
}

export default BasicUser;
