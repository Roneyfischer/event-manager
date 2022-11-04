


//////////////////////////////////////////////////////////////
////////////////////////   ATENÇÃO:   ////////////////////////
//  Esta classe é herdada por outras classes de usuários.   //
//////////////////////////////////////////////////////////////

import BasicUser from "./1.BasicUser.js";
import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import chalk from "chalk";
import userService from "../../../2.service/busnessRoule/user/userService.js";
//

class GuestUser extends BasicUser{
  subscribe = async () => {};

  unsubscribe = async () => {};
}

export default GuestUser;


