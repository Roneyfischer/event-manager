//a validação dos campos obrigatórios é realizada no app para evitar congestionar a fila da conexão com o Banco de dados, embora
// tal validação possa ser realizada diretamente no DB.

import errorHandling from "../../2.service/errorHandling/errorHandling.js";

const generalDataValidation = (
  // fieldNumber,
  fieldNames,
  fieldsToVerify
) => {
  const noSpaceFieldName = fieldNames.replace(/ /, "");
  const separetedFieldNames = noSpaceFieldName.split(/,/);
  const fieldNumber = separetedFieldNames.length;

  let fieldVariableNames = {};

  for (let i = 0; i < fieldNumber; i++) {
    let testen = `${separetedFieldNames[i]}`;
    let reBody = fieldsToVerify;
    let fieldPositionName = (fieldVariableNames.testen = testen);
    let teste = `fieldsToVerify.${fieldPositionName}`;
    teste.to
    function a() {
      return "`${" + teste + "}`";
    }
    console.log("result é:" + a());
  }

  //   const teste = () =>{
  //     let str = `fieldNames.fieldVariableNames[variablePosition]`

  //     for(let i = 0, round = 0; i< fieldNumber; i++ && round++){

  //       str = str+"&&"+str.replace(/variablePosition/, `z)

  //     }

  //   }

  //   const {`${fieldNames}`} = fieldsToVerify

  //   if (cpf && pass) {

  //     return { status: true, message: `field has been completed` };
  //   }

  //  return {status: true}
  //   throw {
  //     status: false,
  //     message: `All fields are mandatory`,
  //   };
};

export default generalDataValidation;
