//fiz uso do trycath pra facilitar posteriores alterações no código, posto que se futuramente alterar o sistema com
// algum código errado, a aplicação não irá quebrar, mas sim retornar um erro no CATH

import GuestUser from "./2.GuestUser.js";
import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import chalk from "chalk";
import userService from "../../../2.service/busnessRoule/user/userService.js";
//

class AdmUser extends GuestUser {
  createEvent = async () => {};

  createGroup = async () => {};
}

export default AdmUser;
