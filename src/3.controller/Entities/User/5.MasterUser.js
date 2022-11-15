import AdmUser from "./3.AdmUser.js";
import dbMethod from "../../../1.model/DAL/dbMethod.js";
import userService from "../../../2.service/busnessRoule/user/userService.js";
import eventService from "../../../2.service/busnessRoule/event/eventService.js";
class MasterUser extends AdmUser {
  editUserRole = async (reqBody) => {
    console.log("> [MasterUser.editUserRole]");
    try {
      const { userId, newRoleToUser } = reqBody;

      const table = "users";
      const nameItenToSearch = "id";
      const valueItenToSearch = [userId];
      const nameItenToUpdate = "role";
      const valueItenToUpdate = [newRoleToUser];

      return userService.update(table, nameItenToSearch, valueItenToSearch, nameItenToUpdate, valueItenToUpdate);
    } catch (error) {
      return errorHandling(error);
    }
  };

  editUserGroup = async (reqBody) => {
    console.log("> [MasterUser.editGroup]");
    try {
      const { userId, newGroupToUser } = reqBody;

      const table = "users";
      const nameItenToSearch = "id";
      const valueItenToSearch = [userId];
      const nameItenToUpdate = "userGroup";
      const valueItenToUpdate = [newGroupToUser];

      return userService.update(table, nameItenToSearch, valueItenToSearch, nameItenToUpdate, valueItenToUpdate);
    } catch (error) {
      return errorHandling(error);
    }
  };

  deleteAnUser = async (reqBody) => {
    console.log("> [MasterUser.deleteUser]");
    try {
      let reqBodyTemporary = reqBody;
      reqBodyTemporary.singularUserId = reqBody.userIdToDelete;

      const reqBodyNew = reqBodyTemporary;

      const executeRead = userService.delete(reqBodyNew);

      return executeRead;
    } catch (error) {
      return errorHandling(error);
    }
  };

  readAllUsersFiltred = async (reqBody) => {
    console.log("> [MasterUser.deleteUser]");
    try {
      const table = "users";
      const itenToReturn = `"id","completeName","role", "userGroup", "email"`;
      const executeRead = userService.readAllFiltred(table, itenToReturn);

      return executeRead;
    } catch (error) {
      return errorHandling(error);
    }
  };

  //excluir usuários de terceiros
  //alterar ROLE de qualquer usuário
  //criar usuários de terceiros
}

export default MasterUser;
