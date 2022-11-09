import dbConnect from "../../0.config/configDb/dbConnect.js";
import errorHandling from "../../2.service/errorHandling/errorHandling.js";
import chalk from "chalk";
import pg from "pg";

const dbMethod = {
  add: async (table, fieldName, fieldValue) => {
    const fieldsNumber = fieldName.split(/,/).length;

    let fieldsNumberVariables = [];

    for (let i = 0; i < fieldsNumber; i++) {
      fieldsNumberVariables.push("$" + (i + 1)); //o $ não contabiliza $0, portanto, deve começar com $1
    }

    const queryText = `INSERT INTO "${table}"(${fieldName}) VALUES(${fieldsNumberVariables}) RETURNING *`;
    const queryValues = fieldValue;
    const client = await dbConnect();

    await client.query(queryText, queryValues).then((res) => {});
    console.log("> [dbMethod.add] Registration successful");
    return { status: true, message: `Registration successful` };
    throw new Error();
  },

  // edit: async (table, fieldName, fieldValue) => {
  //   try {
  //     const fieldsNumber = fieldName.split(/,/).length;

  //     let fieldsNumberVariables = [];

  //     for (let i = 0; i < fieldsNumber; i++) {
  //       fieldsNumberVariables.push("$" + (i + 1)); //o $ não contabiliza $0, portanto, deve começar com $1
  //     }

  //     const queryText = `INSERT INTO "${table}"(${fieldName}) VALUES(${fieldsNumberVariables}) RETURNING *`;
  //     const queryValues = fieldValue
  //     const client = await dbConnect();

  //     await client.query(queryText, queryValues).then((res) => {});
  //     console.log(chalk.blue.bold.italic(`Registration successful`));
  //     return { status: true, message: `Registration successful` };
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  delete: async (table, nameItenToDeleteLine, valueItenToDeleteLine) => {
    console.log(
      table,
      nameItenToDeleteLine,
      valueItenToDeleteLine + "<<<<<<<<<"
    );
    const checkLineExists = await dbMethod.read(
      table,
      nameItenToDeleteLine,
      valueItenToDeleteLine,
      nameItenToDeleteLine
    );

    console.log(
      `> [dbMethod.delete] Checking if the object exists on Db table: ${checkLineExists.status} `
    );

    if (!checkLineExists.status) {
      throw { status: false, message: `Value to delete not exists` };
    }

    const queryText = `DELETE FROM ${table} WHERE ${nameItenToDeleteLine} IN ($1)`;
    const queryValues = valueItenToDeleteLine;

    const client = await dbConnect();

    await client.query(queryText, queryValues).then((res, error) => {
      console.log(
        `> [dbMethod.delete] ${nameItenToDeleteLine} has been deleted`
      );
    });

    return {
      status: true,
      message: `${nameItenToDeleteLine} has been deleted`,
    };
  },

  read: async (table, nameItenToSearch, valueItenToSearch, itenToReturn) => {
    const queryText = `SELECT ${itenToReturn} from ${table} WHERE ${nameItenToSearch} in ($1) `;
    const queryValues = valueItenToSearch;
    const client = await dbConnect();

    return await client.query(queryText, queryValues).then((res) => {
      const dataFinded = res.rows[0];

      if (!dataFinded) {
        console.log("> [dbMethod.delete]  data not found!");
        throw {
          status: false,
          message: `Unexpected error in database search. Data not found. Please check that the fields are filled in correctly. (developerMessage)`,
        };
      }
      return {
        status: true,
        message: `Unexpected error in database search. Data not found. Please check that the fields are filled in correctly. (developerMessage)`,
        dataFinded: dataFinded,
      };
    });
  },

 
};

export default dbMethod;
