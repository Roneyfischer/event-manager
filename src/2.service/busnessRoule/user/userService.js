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
    const secondUserId = (
      await cryptography.basicCript.encript(singularUser + cpf)
    ).dataHashed;

    const table = "users";
    const fieldName = `"singularUser", "cpf", "email", "role", "secondUserId", "pass"`;
    const fieldValue = [
      singularUser,
      cpf,
      email,
      role,
      secondUserId,
      passEncrypted,
    ];
    const teste = await dbMethod.add(table, fieldName, fieldValue);
    return { status: teste.status, message: teste.message };
  },

  login: async (reqBody, res) => {
    console.log("> [userService.login] Open");

    const { cpf, pass } = reqBody;
    const table = "users";
    const nameItenToSearch = "cpf";
    const valueItenToSearch = [cpf];
    const itenToReturn = "*";

    const dataFinded = (
      await dbMethod.read(
        table,
        nameItenToSearch,
        valueItenToSearch,
        itenToReturn
      )
    ).dataFinded;

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

  delete: async (reqBody, singularUserId) => {
    //para exclusão, não uso o "singularUserId". Na controler é preciso verificar o usuário e passar de lá o user a ser excluído.
    //utilizar singularUserId para fazer Log
    console.log("> [userService.delete]");
    const { singularData } = reqBody;
    const table = "users";
    const nameItenToDeleteLine = `"singularUserId"`;
    const valueItenToDeleteLine = [singularData];
    return await dbMethod.delete(
      table,
      nameItenToDeleteLine,
      valueItenToDeleteLine
    );
  },

  edit: async (reqBody) => {},

  //
  //GROUPS:
  //

  createGroup: async (reqBody, singularUserId) => {
    const { singularData } = await reqBody;

    const table = "groups";
    const fieldName = `"singularUserId", "singularGroup"`;
    const fieldValue = [singularUserId, singularData];

    return await dbMethod.add(table, fieldName, fieldValue);
  },
  editGroup: async (reqBody, singularUserId) => {
    console.log("> [userService.editGroup]");
    const { singularData } = await reqBody;

    const table = "groups";
    const fieldName = `"singularGroup"`;
    const fieldValue = [singularData];

    return await dbMethod.edit(table, fieldName, fieldValue);
  },

  deleteGroup: async (reqBody, singularUserId) => {
    console.log("> [userService.deleteGroup]");
    const { singularData } = reqBody;
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

  createCategory: async (reqBody, singularUserId) => {
    console.log("> [userService.createCategory]");
    const { singularData } = await reqBody;

    const table = "categories";
    const fieldName = `"singularUserId", "singularCategory"`;
    const fieldValue = [singularUserId, singularData];

    return await dbMethod.add(table, fieldName, fieldValue);
  },

  editCategory: async (reqBody, singularUserId) => {
    console.log("> [userService.editCategory]");
    const { singularData } = await reqBody;

    const table = "categories";
    const fieldName = `"singularCategory"`;
    const fieldValue = [singularData];

    return await dbMethod.edit(table, fieldName, fieldValue);
  },

  deleteCategory: async (reqBody, singularUserId) => {
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
};

export default userService;
