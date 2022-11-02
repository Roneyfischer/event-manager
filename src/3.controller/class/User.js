//fiz uso do trycath pra facilitar posteriores alterações no código, posto que se futuramente alterar o sistema com
// algum código errado, a aplicação não irá quebrar, mas sim retornar um erro no CATH

import dbMethod from "../../1.model/dbMethods/dbMethod.js";
import cryptoArgon2 from "../../2.service/busnessRoule/crypto/cryptoOperator.js";
import userRegisterDataValidation from "../valitadtion/user/userRegisterDataValidation.js";
import userLoginDataValidation from "../valitadtion/user/userLoginDataValidation.js";
import errorHandling from "../../2.service/errorHandling/errorHandling.js";
import chalk from "chalk";
import userService from "../../2.service/busnessRoule/login/userService.js";
//

class User {
  //
  //
  //
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

  //
  //
  //

  login = async (reqBody, res) => {
    try {
      //se houver erro na validação, o "userLoginDataValidation" lança/throw erro,
      //e o CATH desta função retorna para o console e frontEnd
      const dataValidation = userLoginDataValidation(reqBody);

      if (dataValidation.status) {
        return await userService.login(reqBody);
      } else {
        throw dataValidation;
      }
    } catch (error) {
      return errorHandling(error);
    }
  };

  //
  //
  //
  setConfigJwtCookie =  (reqBody, res) => {
    const { cpf } = reqBody;
    return userService["setConfigJwtCookie"](cpf);
  };

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

export default User;
