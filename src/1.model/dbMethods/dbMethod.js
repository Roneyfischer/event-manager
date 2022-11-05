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

      await client.query(queryText, queryValues).then((res) => {});
      console.log(chalk.blue.bold.italic(`Registration successful`));
      return { status: true, message: `Registration successful` };
    } catch (error) {
      throw error;
    }
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

  delete: async (table, nameItenToSearch, valueItenToSearch) => {
    try {
      const fieldsNumber = fieldName.split(/,/).length;

      const queryText = `DELETE FROM ${table} WHERE ${nameItenToSearch} = $1`;
      const queryValues = [valueItenToSearch];
      const client = await dbConnect();

      await client.query(queryText, queryValues).then((res) => {});
      console.log(chalk.blue.bold.italic(`Registration successful`));
      return { status: true, message: `Registration successful` };
    } catch (error) {
      throw error;
    }
  },

  read: async (table, nameItenToSearch, valueItenToSearch, itenToReturn) => {
    try {
      const queryText = `SELECT ${itenToReturn} from ${table} WHERE ${nameItenToSearch} = $1`;
      const queryValues = [valueItenToSearch];
      const client = await dbConnect();

      return await client.query(queryText, queryValues).then((res) => {
        const dataFinded = res.rows[0];

        if (dataFinded) {
          return dataFinded;
        } else {
          throw {
            status: false,
            message: `Unexpected error in database search. Data not found. Please check that the fields are filled in correctly. (developerMessage)`,
          };
        }
      });
    } catch (error) {
      throw error;
    }
  },

  //   read: async (table, nameItenToSearch, valueItenToSearch, itenToReturn) => {
  //     try {
  //       const queryText =
  //       `SELECT ${itenToReturn} from ${table} WHERE
  //       "singularUser"  = $1
  //       AND "email" = $2`;
  //       const values = ["8", "8"];
  //       const client = await dbConnect();
  //       console.log(values);

  //       return await client.query(queryText, values).then((res) => {
  //         const dataFinded = res.rows[0];
  //         console.log(dataFinded);
  //         return dataFinded;
  //       });
  //     } catch (error) {
  //       return errorHandling(error.detail);
  //     }
  //   },
};

export default dbMethod;
