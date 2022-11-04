import GuestUser from "./2.GuestUser.js";
import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import chalk from "chalk";
import userService from "../../../2.service/busnessRoule/user/userService.js";
import DataGroupValitadion from "../../valitadtion/group/DataGroupValitadion.js";

class AdmUser extends GuestUser {
  // createEvent = async (reqBody) => {};

  // editEvent = async (reqBody) => {};

  // cancelEvent = async (reqBody) => {};

  // deleteEvent = async () => {};

  createGroup = async (reqBody) => {
    try {
      const dataValidation = DataGroupValitadion(reqBody);

      if (dataValidation.status) {

        return await userService.createGroup(reqBody);
        
      } else {
        throw dataValidation;
      }
    } catch (error) {
      return errorHandling(error);
    }
  };

  editGroup = async (reqBody) => {
    try {

        return await userService.editGroup(reqBody);
     
             
    } catch (error) {
      return errorHandling(error);
    }
  };

  deleteGroup = async () => {
    try {

      return await userService.deleteGroup();
   
           
  } catch (error) {
    return errorHandling(error);
  }
  };
}

export default AdmUser;
