import dbMethod from "../../../1.model/DAL/dbMethod.js";
import cryptography from "../crypto/cryptoOperator.js";

import jwt from "jsonwebtoken";
import chalk from "chalk";
import cookieParser from "cookie-parser";

const userService = {
  register: async (reqBody) => {
    console.log("> [userService.register]");
    const { singularUser, cpf, email, role, pass } = await reqBody;
    const passEncrypted = await cryptography.cryptoArgon2.encrypt(pass);
    const cpfEncrypted = (await cryptography.basicCript.encript(cpf))
      .dataHashed;

    const secondUserId = (
      await cryptography.basicCript.encript(singularUser + cpf)
    ).dataHashed;

    const table = "users";
    const fieldName = `"singularUser", "cpf", "email", "role", "secondUserId", "pass"`;
    const fieldValue = [
      singularUser,
      cpfEncrypted,
      email,
      role,
      secondUserId,
      passEncrypted,
    ];
    const teste = await dbMethod.add(table, fieldName, fieldValue);
    return { status: teste.status, message: teste.message };
  },
  login: async (reqBody) => {
    console.log("> [userService.login] Open");

    const { cpf, pass } = reqBody;

    const cpfEncrypted = (await cryptography.basicCript.encript(cpf))
      .dataHashed;

    const table = "users";
    const nameItenToSearch = "cpf";
    const valueItenToSearch = [cpfEncrypted];
    const itenToReturn = "*";

    const dataFinded = (
      await dbMethod.read(
        table,
        nameItenToSearch,
        valueItenToSearch,
        itenToReturn
      )
    ).dataFinded[0];

    const verifyPassword = await cryptography.cryptoArgon2.verify(
      pass,
      dataFinded.pass
    );

    if (verifyPassword) {
      const token = await userService.setJWToken(
        dataFinded.id,
        dataFinded.cpf,
        dataFinded.secondUserId,
        dataFinded.role
      );
      return {
        status: verifyPassword.status,
        message: verifyPassword.message,
        token: token,
      };
    }

    return { status: verifyPassword.status, message: verifyPassword.message };
  },

  setJWToken: async (id, cpf, secondUserId, role) => {
    const token = jwt.sign(
      {
        singularUserId: id,
        userCpf: cpf,
        secondUserId: secondUserId,
        role: role,
      },
      process.env.JWT_KEY,
      {
        expiresIn: 30000,
      }
    );
    return token;
  },

  delete: async (reqBody) => {
    //para exclus??o, n??o uso o "singularUserId". Na controler ?? preciso verificar o usu??rio e passar de l?? o user a ser exclu??do.
    //utilizar singularUserId para fazer Log

    const { singularUserId } = await reqBody;
    console.log(
      "> [userService.delete] ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;" +
        singularUserId
    );
    const table = "users";
    const nameItenToDeleteLine = "id";
    const valueItenToDeleteLine = [singularUserId];
    return await dbMethod.delete(
      table,
      nameItenToDeleteLine,
      valueItenToDeleteLine
    );
  },

  edit: async (reqBody) => {},

  read: async (data) => {
    const { table, nameItenToSearch, valueItenToSearch, itenToReturn } = data;
    

    const dataFinded = await dbMethod.read(
      table,
      nameItenToSearch,
      valueItenToSearch,
      itenToReturn
    );

    return dataFinded;
  },

  //
  //GROUPS:
  //

  createGroup: async (reqBody) => {
    const { singularData, singularUserId } = await reqBody;

    const table = "groups";
    const fieldName = `"singularUserId", "singularGroup"`;
    const fieldValue = [singularUserId, singularData];

    return await dbMethod.add(table, fieldName, fieldValue);
  },

  editGroup: async (reqBody) => {
    console.log("> [userService.editGroup]");
    const { singularData, singularUserId } = await reqBody;

    const table = "groups";
    const fieldName = `"singularGroup"`;
    const fieldValue = [singularData];

    return await dbMethod.edit(table, fieldName, fieldValue);
  },

  deleteGroup: async (reqBody) => {
    console.log("> [userService.deleteGroup]");
    const { singularData } = await reqBody;
    const table = "groups";
    const nameItenToDeleteLine = `"singularGroup"`;
    const valueItenToDeleteLine = [singularData];
    return await dbMethod.delete(
      table,
      nameItenToDeleteLine,
      valueItenToDeleteLine
    );
  },

  //
  //CATEGORIES:
  //

  createCategory: async (reqBody) => {
    console.log("> [userService.createCategory]");
    const { singularData, singularUserId } = await reqBody;

    const table = "categories";
    const fieldName = `"singularUserId", "singularCategory"`;
    const fieldValue = [singularUserId, singularData];

    return await dbMethod.add(table, fieldName, fieldValue);
  },

  editCategory: async (reqBody) => {
    console.log("> [userService.editCategory]");
    const { singularData } = await reqBody;

    const table = "categories";
    const fieldName = `"singularCategory"`;
    const fieldValue = [singularData];

    return await dbMethod.edit(table, fieldName, fieldValue);
  },

  deleteCategory: async (reqBody) => {
    console.log("> [userService.deleteCategory]");
    const { singularData } = reqBody;
    const table = "categories";
    const nameItenToDeleteLine = `"singularCategory"`;
    const valueItenToDeleteLine = [singularData];

    return await dbMethod.delete(
      table,
      nameItenToDeleteLine,
      valueItenToDeleteLine
    );
  },
  readEvent: async (reqBody) => {
    return event;
  },
};

export default userService;
