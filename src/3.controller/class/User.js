//fiz uso do trycath pra facilitar posteriores alterações no código, posto que se futuramente alterar o sistema com
// algum código errado, a aplicação não irá quebrar, mas sim retornar um erro no CATH

import userDbMethod from "../../1.model/dbMethods/userDbMethod.js";
import cryptoArgon2 from "../../2.service/busnessRoule/crypto/cryptoOperator.js";
import userRegisterDataValidation from "../valitadtion/user/userRegisterDataValidation.js";
import userLoginDataValidation from "../valitadtion/user/userLoginDataValidation.js";
import errorHandling from "../../2.service/errorHandling/errorHandling.js";

//

class User {
  //
  //
  //
  register = async (reqBody) => {
    try {
      const dataValidation = userRegisterDataValidation(reqBody);

      if (dataValidation.status) {
        const { singularUser, cpf, email, pass } = await reqBody;
        const passEncrypted = await cryptoArgon2.encrypt(pass);

        const registrationData = { singularUser, cpf, email, passEncrypted };

        return (await userDbMethod.register(registrationData)).message;
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };

  //
  //
  //

  login = async (reqBody) => {
    try {
      const dataValidation = userLoginDataValidation(reqBody);
      
      if (dataValidation.status) {
        const { pass } = reqBody;

        const passEncrypted = (await userDbMethod.login(reqBody)).pass;

        return (await cryptoArgon2.verify(pass, passEncrypted)).message;
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };

  //
  //
  //

  authorization = async (reqBody) => {
    try {
    } catch (error) {}
  };

  delete = async (reqBody) => {
    try {
    } catch (error) {}
  };

  edit = async (reqBody) => {
    try {
    } catch (error) {}
  };
}

export default User;
