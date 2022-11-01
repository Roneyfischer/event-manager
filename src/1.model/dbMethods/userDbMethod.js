import dbConnect from "../../0.config/configDb/dbConnect.js";
import errorHandling from "../../2.service/errorHandling/errorHandling.js";
import pg from "pg";

const userDbMethod = {
  register: async function (reqBody) {
    try {
      const { singularUser, cpfEncrypted, email, passEncrypted } = reqBody;

      const queryText =
        'INSERT INTO "users"("singularUser", "cpf", "email", "pass") VALUES($1, $2, $3, $4) RETURNING *';
      const values = [singularUser, cpfEncrypted, email, passEncrypted];
      const client = await dbConnect();

      await client.query(queryText, values);

      console.log(res.rows[0]);
      return `Registration successful`;
    } catch (error) {
      return errorHandling(error.detail);
    }
  },
};

export default userDbMethod;
