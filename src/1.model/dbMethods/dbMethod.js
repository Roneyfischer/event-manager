import dbConnect from "../../0.config/configDb/dbConnect.js";
import errorHandling from "../../2.service/errorHandling/errorHandling.js";

import pg from "pg";

const dbMethod = {
  add: async (table, fieldName, fieldValue) => {
    try {
      const fieldsNumber = fieldName.split(",", 1000).length;

      let fieldsNumberVariables = [];

      for (let i = 0; i < fieldsNumber; i++) {
        fieldsNumberVariables.push("$" + (i + 1)); //o $ não contabiliza $0, portanto, deve começar com $1
      }
      console.log(fieldsNumberVariables);

      const queryText = `INSERT INTO "${table}"(${fieldName}) VALUES(${fieldsNumberVariables}) RETURNING *`;

      const client = await dbConnect();

      await client.query(queryText, fieldValue).then((res) => {
        console.log(res.rows[0]);
      });

      return { status: true, message: `Registration successful` };
    } catch (error) {
      console.log(error);
      return { status: false, message: errorHandling(error.detail) };
    }
  },

  read: async (table, nameItenToSearch, valueItenToSearch, itenToReturn) => {
    try {
      const queryText = `SELECT ${itenToReturn} from ${table} WHERE ${nameItenToSearch} = $1`;
      const values = [valueItenToSearch];
      const client = await dbConnect();

      return await client.query(queryText, values).then((res) => {
        const dataFinded = res.rows[0];
        console.log(dataFinded);
        return dataFinded;
      });
    } catch (error) {
      return errorHandling(error.detail);
    }
  },
};

export default dbMethod;
