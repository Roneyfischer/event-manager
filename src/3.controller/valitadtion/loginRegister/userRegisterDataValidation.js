//a validação dos campos obrigatórios é realizada no app para evitar congestionar a fila da conexão com o Banco de dados, embora
// tal validação possa ser realizada diretamente no DB.

import errorHandling from "../../../2.service/errorHandling/errorHandling.js";

const userRegisterDataValidation = (reqBody) => {
  const { type, singularUser, cpf, email, pass, passConfirmation } = reqBody;

  if (type && singularUser && cpf && email && pass && passConfirmation) {
    return checkPassMatch(pass, passConfirmation);
  }
  throw {
    status: false,
    message: `All fields are mandatory`,
  };
};

const checkPassMatch = (pass, passConfirmation) => {
  if (pass === passConfirmation) {
    return { status: true };
  }
  throw {
    status: false,
    message: `Password and Password Confirmation does not match`,
  };
};

export default userRegisterDataValidation;
