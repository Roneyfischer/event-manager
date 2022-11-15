import dbConnect from "../../0.config/configDb/dbConnect.js";
import errorHandling from "../../2.service/errorHandling/errorHandling.js";
import chalk from "chalk";
import pg from "pg";

const dbMethod = {
  add: async (table, fieldName, fieldValue) => {
    try {
      const fieldsNumber = fieldName.split(/,/).length;

      let fieldsNumberVariables = [];

      for (let i = 0; i < fieldsNumber; i++) {
        fieldsNumberVariables.push("$" + (i + 1)); //o $ não contabiliza $0, portanto, deve começar com $1
      }

      const queryText = `INSERT INTO "${table}"(${fieldName}) VALUES(${fieldsNumberVariables}) RETURNING *`;
      const queryValues = fieldValue;
      const client = await dbConnect();

      const dataFinded = (await client.query(queryText, queryValues)).rows[0];

      console.log(dataFinded);
      return {
        status: true,
        message: `Registration successful`,
        dataFinded: dataFinded,
      };
    } catch (error) {
      errorHandling(error);
      return { status: false, message: error.message };
    }
  },

  update: async (
    table,
    nameItenToSearch,
    valueItenToSearch,
    nameItenToUpdate,
    valueItenToUpdate
  ) => {
    try {
      console.log(">[dbMethod.update]");
      const queryText = `UPDATE "${table}" SET "${nameItenToUpdate}" = ($1)  WHERE "${nameItenToSearch}" = ${valueItenToSearch}`;
      const queryValues = valueItenToUpdate;
      console.log(
        `Update ${nameItenToUpdate} where "${nameItenToSearch}", to "${valueItenToUpdate}", on "${table}"`
      );
      const client = await dbConnect();

      await client.query(queryText, queryValues);
      return {
        status: true,
        message: `Update ${nameItenToUpdate} where "${nameItenToSearch}", to "${valueItenToSearch}", on "${table}"`,
      };
    } catch (error) {
      console.log(">[dbMethod.update] ERROR: " + error);
    }
  },

  delete: async (table, nameItenToDeleteLine, valueItenToDeleteLine) => {
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

    const queryText = `DELETE FROM "${table}" WHERE ${nameItenToDeleteLine} IN ($1)`;
    const queryValues = valueItenToDeleteLine;

    const client = await dbConnect();

    await client.query(queryText, queryValues);

    return {
      status: true,
      message: `${nameItenToDeleteLine} ${valueItenToDeleteLine} on ${table} has been deleted`,
    };
  },

  read: async (table, nameItenToSearch, valueItenToSearch, itenToReturn) => {
    console.log("> [dbMethod.read]  open");
    console.log(
      "table, nameItenToSearch, valueItenToSearch, itenToReturn: >>>> " + table,
      nameItenToSearch,
      valueItenToSearch,
      itenToReturn
    );
    let numberOfColumns = `$1`;
    for (let i = 1; i < valueItenToSearch.length; i++) {
      numberOfColumns = numberOfColumns + `, $${i + 1}`;
    }

    const queryText = `SELECT ${itenToReturn} from "${table}" WHERE (${nameItenToSearch}) = (${numberOfColumns}) `;
    const queryValues = valueItenToSearch;
    const client = await dbConnect();

    return await client.query(queryText, queryValues).then((res) => {
      const dataFinded = res.rows; //alterar

      if (!dataFinded[0]) {
        console.log("> [dbMethod.read]  data not found!");
        return {
          status: false,
          message: `Unexpected error in database search. Data not found. Please check that the fields are filled in correctly. (developerMessage)`,
        };
      }
      return {
        status: true,
        message: `The data "${dataFinded.singularEvent}" has been searched`,
        dataFinded: dataFinded,
      };
    });
  },

  readAll: async (table) => {
    const queryText = `SELECT * from "${table}"`;
    //const queryValues = valueItenToSearch; //inútil?
    const client = await dbConnect();

    return await client.query(queryText).then((res) => {
      const dataFinded = res.rows; //alterar

      if (!dataFinded[0]) {
        console.log("> [dbMethod.readAll]  data not found!");
        return {
          status: false,
          message: `Unexpected error in database search. Data not found. Please check that the fields are filled in correctly. (developerMessage)`,
        };
      }
      return {
        status: true,
        message: `The data "${dataFinded.singularEvent}" has been searched`,
        dataFinded: dataFinded,
      };
    });
  },
};

export default dbMethod;
