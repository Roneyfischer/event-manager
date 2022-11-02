import dbMethod from "../../../1.model/dbMethods/dbMethod.js";
import cryptoArgon2 from "../crypto/cryptoOperator.js";
import jwt from "jsonwebtoken";
import chalk from "chalk";
import cookieParser from "cookie-parser";

const userService = {
  register: async (reqBody) => {
    const { singularUser, cpf, email, pass } = await reqBody;
    const passEncrypted = await cryptoArgon2.encrypt(pass);

    const table = "users";
    const fieldName = `"singularUser", "cpf", "email", "pass"`;
    const fieldValue = [singularUser, cpf, email, passEncrypted];

    return (await dbMethod.add(table, fieldName, fieldValue)).message;
  },

  login: async (reqBody, res) => {
    const { cpf, pass } = reqBody;

    const table = "users";
    const nameItenToSearch = "cpf";
    const valueItenToSearch = cpf;
    const itenToReturn = "pass";

    const longHash = (
      await dbMethod.read(
        table,
        nameItenToSearch,
        valueItenToSearch,
        itenToReturn
      )
    ).pass;
    const verifyPassword = await cryptoArgon2.verify(pass, longHash);

    //   console.log(chalk.green.bold.italic(verifyPassword.message));

    return { status: verifyPassword.status, message: verifyPassword.message };
  },
  //
  //
  //
  setConfigJwtCookie: (cpf) => {
    //legado lixo
    // const token = jwt.sign({ id_user: cpf }, process.env.JWT_KEY);
    // return `"access_token", ${token}, {
    //   secure: true,
    //   sameSite: "none",
    //   expire: 500000,
    // }`;
  },
  //
  //
  //
  authorization: async (reqBody) => {},

  delete: async (reqBody) => {},

  edit: async (reqBody) => {},
};

export default userService;
