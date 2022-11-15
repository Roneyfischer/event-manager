import AdmUser from "./3.AdmUser.js";

class MasterUser extends AdmUser {
  editRole = async (reqBody) => {
    console.log("> [MasterUser.editRole]");
    try {
    } catch (error) {
      return errorHandling(error);
    }
  };

  editGroup = async (reqBody) => {
    console.log("> [MasterUser.editGroup]");
    try {
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
