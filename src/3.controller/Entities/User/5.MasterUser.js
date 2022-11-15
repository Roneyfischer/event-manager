import AdmUser from "./3.AdmUser.js";
import dbMethod from "../../../1.model/DAL/dbMethod.js";
class MasterUser extends AdmUser {
  editUserRole = async (reqBody) => {
    console.log("> [MasterUser.editUserRole]");
    try {
      const { userId, newRoleToUser } = reqBody;

      const table = "users";
      const nameItenToSearch = "id";
      const valueItenToSearch = userId;
      const nameItenToUpdate = "role";
      const valueItenToUpdate = [newRoleToUser];

      return dbMethod.update(
        table,
        nameItenToSearch,
        valueItenToSearch,
        nameItenToUpdate,
        valueItenToUpdate
      );
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
      const valueItenToSearch = userId;
      const nameItenToUpdate = "userGroup";
      const valueItenToUpdate = [newGroupToUser];

      return dbMethod.update(
        table,
        nameItenToSearch,
        valueItenToSearch,
        nameItenToUpdate,
        valueItenToUpdate
      );
    } catch (error) {
      return errorHandling(error);
    }
  };

  desactiveUser = async (reqBody) => {
    console.log("> [MasterUser.desactiveUser]");
    try {
    } catch (error) {
      return errorHandling(error);
    }
  };

  deleteUser = async (reqBody) => {
    console.log("> [MasterUser.deleteUser]");
    try {
    } catch (error) {
      return errorHandling(error);
    }
  };
  //excluir usuários de terceiros
  //alterar ROLE de qualquer usuário
  //criar usuários de terceiros
}

export default MasterUser;
