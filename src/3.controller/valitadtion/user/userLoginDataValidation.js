//a validação dos campos obrigatórios é realizada no app para evitar congestionar a fila da conexão com o Banco de dados,
// embora tal validação possa ser realizada diretamente no DB.

const userLoginDataValidation = (reqBody) => {
  const { cpf, pass } = reqBody;

  if (cpf && pass) {
    return { status: true, message: `field has been completed` };
  }
  throw { status: false, message: `All fields are mandatory` };
};
export default userLoginDataValidation;
