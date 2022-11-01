import dbConnect from "../../0.config/configDb/dbConnect.js";

async function addUser(reqBody) {
  const { singularUser, cpf, email, pass } = reqBody;

  const queryText =
    'INSERT INTO "users"("singularUser", "cpf", "email", "pass") VALUES($1, $2, $3, $4) RETURNING *';
  const values = [singularUser, cpf, email, pass];
  const client = await dbConnect();

  client
    .query(queryText, values)
    .then((res) => {
      console.log(res.rows[0]);
      return res.rows[0];
    })
    .catch((error) => {
      dbAddError(error);
      return false;
    });
}

export default {addUser}