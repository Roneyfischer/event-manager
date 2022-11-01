import userDbMethod from "../../1.model/dbMethods/userDbMethod.js";
import cryptoArgon2 from "../../2.service/busnessRoule/crypto/cryptoOperator.js";
import userRegisterDataValidation from "../valitadtion/userRegisterDataValidation.js";

class User {
  constructor(data) {}

  register = async function (reqBody) {
    const dataValidation = userRegisterDataValidation(reqBody);

    if (dataValidation.status) {
      
      const { type, singularUser, cpf, email, pass } = await reqBody;
      const passEncrypted = await cryptoArgon2.encrypt(pass);
      const cpfEncrypted = await cryptoArgon2.encrypt(cpf);

      const registrationData = {
        singularUser,
        cpfEncrypted,
        email,
        passEncrypted,
      };

      return await userDbMethod.register(registrationData);
    } else {
      return dataValidation.message;
    }
  };

  login = async function (reqBody) {};

  delet(reqBody) {}

  edit(reqBody) {}
}

export default User;
