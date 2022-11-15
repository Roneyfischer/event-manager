//a validação dos campos obrigatórios é realizada no app para evitar congestionar a fila da conexão com o Banco de dados, embora
// tal validação possa ser realizada diretamente no DB.

import errorHandling from "../../../2.service/errorHandling/errorHandling.js";

const inputsValidation = (reqBody) => {
  console.log("> [userRegisterDataValidation] Validating data");
  const { type, completeName, cpf, email, pass, passConfirmation } = reqBody;

  if (type && completeName && cpf && email && pass && passConfirmation) {
    return checkDataMatch(pass, passConfirmation);
  }
  throw {
    status: false,
    message: `All fields are mandatory`,
  };
};

const checkDataMatch = (pass, passConfirmation) => {
  console.log(
    "> [checkDataMatch] Validating if match Data and Data Confirmation"
  );
  if (pass === passConfirmation) {
    return { status: true };
  }
  throw {
    status: false,
    message: `Data and Data Confirmation does not match`,
  };
};

export default { inputsValidation, checkDataMatch };
