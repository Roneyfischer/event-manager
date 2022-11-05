import dbMethod from "../../../1.model/dbMethods/dbMethod.js";
import cryptoArgon2 from "../crypto/cryptoOperator.js";
import jwt from "jsonwebtoken";
import chalk from "chalk";
import cookieParser from "cookie-parser";

const userService = {
  register: async (reqBody) => {
    console.log("> [userService.register]");
    const { singularUser, cpf, email, pass } = await reqBody;
    const passEncrypted = await cryptoArgon2.encrypt(pass);

    const table = "users";
    const fieldName = `"singularUser", "cpf", "email", "pass"`;
    const fieldValue = [singularUser, cpf, email, passEncrypted];
    const teste = await dbMethod.add(table, fieldName, fieldValue);
    return { status: teste.status, message: teste.message };
  },

  login: async (reqBody, res) => {
    console.log("> [userService.login]");

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

  authorization: async (reqBody) => {},

  delete: async (reqBody) => {},

  edit: async (reqBody) => {},

  //
  //GROUPS:
  //

  createGroup: async (reqBody) => {
    console.log("> [userService.createGroup]");
    const { singularUser, singularData } = await reqBody;

    const table = "groups";
    const fieldName = `"singularUser", "singularGroup"`;
    const fieldValue = [singularUser, singularData];

    return (await dbMethod.add(table, fieldName, fieldValue)).message;
  },
  editGroup: async (reqBody) => {
    console.log("> [userService.editGroup]");
    const { singularUser, singularData } = await reqBody;

    const table = "groups";
    const fieldName = `"singularGroup"`;
    const fieldValue = [singularData];

    return (await dbMethod.edit(table, fieldName, fieldValue)).message;
  },

  deleteGroup: async (reqBody) => {
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

  createCategory: async (reqBody) => {
    console.log("> [userService.createCategory]");
    const { singularUser, singularData } = await reqBody;

    const table = "categories";
    const fieldName = `"singularUser", "singularCategory"`;
    const fieldValue = [singularUser, singularData];

    return (await dbMethod.add(table, fieldName, fieldValue)).message;
  },

  editCategory: async (reqBody) => {
    console.log("> [userService.editCategory]");
    const { singularUser, singularData } = await reqBody;

    const table = "categories";
    const fieldName = `"singularCategory"`;
    const fieldValue = [singularData];

    return (await dbMethod.edit(table, fieldName, fieldValue)).message;
  },

  deleteCategory: async (reqBody) => {
    console.log("> [userService.deleteCategory]");
    const { singularCategory } = reqBody;
    const table = "categories";
    const nameItenToDeleteLine = `"singularCategory"`;
    const valueItenToDeleteLine = [singularCategory];

    return (
      await dbMethod.delete(table, nameItenToDeleteLine, valueItenToDeleteLine)
    ).message;
  },
};

export default userService;
