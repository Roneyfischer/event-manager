//fiz uso do trycath pra facilitar posteriores alterações no código, posto que se futuramente alterar o sistema com
// algum código errado, a aplicação não irá quebrar, mas sim retornar um erro no CATH

import dbMethod from "../../1.model/dbMethods/dbMethod.js";
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
        // const registrationData = { singularUser, cpf, email, passEncrypted };

        const table = "users";
        const fieldName = `"singularUser", "cpf", "email", "pass"`;
        const fieldValue = [singularUser, cpf, email, passEncrypted];

        return (await dbMethod.add(table, fieldName, fieldValue)).message;
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
        const { cpf, pass } = reqBody;

        const table = "users";
        const nameItenToSearch = "cpf";
        const valueItenToSearch = cpf;
        const itenToReturn = "pass";

        const passEncrypted = (
          await dbMethod.read(
            table,
            nameItenToSearch,
            valueItenToSearch,
            itenToReturn
          )
        ).pass;

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
