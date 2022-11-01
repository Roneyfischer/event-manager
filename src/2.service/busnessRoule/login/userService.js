import dbMethod from "../../../1.model/dbMethods/dbMethod.js";
import cryptoArgon2 from "../crypto/cryptoOperator.js";

const userService = {
  register: async (reqBody) => {
    const { singularUser, cpf, email, pass } = await reqBody;
    const passEncrypted = await cryptoArgon2.encrypt(pass);

    const table = "users";
    const fieldName = `"singularUser", "cpf", "email", "pass"`;
    const fieldValue = [singularUser, cpf, email, passEncrypted];

    return (await dbMethod.add(table, fieldName, fieldValue)).message;
    
  },

  login: async (reqBody) => {
    
      //se houver erro na validação, o "userLoginDataValidation" lança/throw erro,
      //e o CATH desta função retorna para o console e frontEnd
      const dataValidation = userLoginDataValidation(reqBody);

      if (dataValidation.status) {
        const { cpf, pass } = reqBody;

        const table = "users";
        const nameItenToSearch = "cpf";
        const valueItenToSearch = cpf;
        const itenToReturn = "pass";

        const passEncrypted = (
          await dbMethod.read(
            table,
            nameItenToSearch,
            valueItenToSearch,
            itenToReturn
          )
        ).pass;
        const verifyPassword = await cryptoArgon2.verify(pass, passEncrypted);

        console.log(chalk.green.bold.italic(verifyPassword.message));
        return verifyPassword;
      }      
  },

  authorization: async (reqBody) => {
   
  },

  delete: async (reqBody) => {
    
  },

  edit: async (reqBody) => {
  
  }
};

export default userService;
