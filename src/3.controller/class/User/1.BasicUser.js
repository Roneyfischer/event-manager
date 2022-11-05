//////////////////////////////////////////////////////////////
////////////////////////   ATENÇÃO:   ////////////////////////
//  Esta classe é herdada por outras classes de usuários.   //
//////////////////////////////////////////////////////////////

import userRegisterDataValidation from "../../valitadtion/loginRegister/userRegisterDataValidation.js";
import userLoginDataValidation from "../../valitadtion/loginRegister/userLoginDataValidation.js";
import generalDataValidation from "../../valitadtion/FAILgeneralDataValidation.js";
import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import chalk from "chalk";
import userService from "../../../2.service/busnessRoule/user/userService.js";

class BasicUser {
  register = async (reqBody) => {
    console.log("> [BasicUser.register]");
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
    console.log("> [BasicUser.login]");
    try {
      //se houver erro na validação, o "userLoginDataValidation" lança/throw erro,
      //e o CATH desta função retorna para o console e frontEnd
      const dataValidation = userLoginDataValidation(reqBody);

      if (dataValidation.status) {
        console.log(
          chalk.blue.bold.italic(
            "> [BasicUser.login] " + (await userService.login(reqBody)).message
          )
        );
        return await userService.login(reqBody);
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };

  logout = async (reqBody, res) => {
    console.log("> [BasicUser.logout]");
  };

  authorization = async (reqBody) => {
    console.log("> [BasicUser.authorization]");
    try {
    } catch (error) {
      return errorHandling(error);
    }
  };

  delete = async (reqBody) => {
    console.log("> [BasicUser.delete]");
    try {
    } catch (error) {
      return errorHandling(error);
    }
  };

  edit = async (reqBody) => {
    console.log("> [BasicUser.edit]");
    try {
    } catch (error) {
      return errorHandling(error);
    }
  };
}

export default BasicUser;
