import dbMethod from "../../1.model/dbMethods/addOnDb";

class User {
  constructor(data) {}

  register = async function (reqBody) {
    return await dbMethod.addUser(reqBody);
  }

  deleUser(reqBody) {}

  editUser(reqBody) {}

  addEvent(reqBody) {}

  deletEvent(reqBody) {}
}

export default User;
