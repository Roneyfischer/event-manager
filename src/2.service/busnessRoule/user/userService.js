import dbMethod from "../../../1.model/DAL/dbMethod.js";
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

    const verifyPassword = await cryptoArgon2.verify(pass, dataFinded.pass);
    
    if(verifyPassword){
    
    const token = await userService.setJWToken(dataFinded.id, dataFinded.cpf, dataFinded.secondUserId)
    return { status: verifyPassword.status, message: verifyPassword.message, token: token };
    }

   return { status: verifyPassword.status, message: verifyPassword.message };
    
  },

  setJWToken: async (id, cpf, secondUserId) => {
   
    const token = jwt.sign({ userId: id, userCpf: cpf, secondUserId: secondUserId}, process.env.JWT_KEY, {
        expiresIn: 30000,
      });
    return token
  },

  delete: async (reqBody) => {
    console.log("> [userService.delete]");
    const { singularData } = reqBody;
    const table = "users";
    const nameItenToDeleteLine = `"singularUser"`;
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
    const { singularData } = reqBody;
    const table = "categories";
    const nameItenToDeleteLine = `"singularCategory"`;
    const valueItenToDeleteLine = [singularData];

    return (
      await dbMethod.delete(table, nameItenToDeleteLine, valueItenToDeleteLine)
    ).message;
  },
};

export default userService;
