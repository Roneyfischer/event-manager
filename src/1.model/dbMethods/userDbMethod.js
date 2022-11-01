import dbConnect from "../../0.config/configDb/dbConnect.js";
import errorHandling from "../../2.service/errorHandling/errorHandling.js";

import pg from "pg";

const userDbMethod = {
  register: async (reqBody) => {
    try {
      const { singularUser, cpf, email, passEncrypted } = reqBody;

      const queryText =
        'INSERT INTO "users"("singularUser", "cpf", "email", "pass") VALUES($1, $2, $3, $4) RETURNING *';
      const values = [singularUser, cpf, email, passEncrypted];
      const client = await dbConnect();

      await client.query(queryText, values).then((res) => {
        console.log(res.rows[0]);
      });

      return { status: true, message: `Registration successful` };
    } catch (error) {
      return { status: false, message: errorHandling(error.detail) };
    }
  },

  login: async (reqBody) => {
    try {
      const { cpf, pass } = reqBody;

      const queryText = 'SELECT "pass" from "users" WHERE "cpf" = $1';
      const values = [cpf];
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

export default userDbMethod;
