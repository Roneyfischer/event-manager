import Pool from "pg-pool";
import * as dotenv from "dotenv";
import errorHandling from "../../2.service/errorHandling/errorHandling.js";

async function dbConnect() {
  try {
    console.log("> [dbConnect] initializing DB connection");
    console.log("Senha DB: " + process.env.DB_PWD);
    const pool = new Pool({
      connectionString: `postgress://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_URL}/${process.env.DB_NAME}`,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    const client = await pool.connect();
    console.log("> [dbConnect] Connection established. Pool has been created!");

    return client;
  } catch (error) {
    errorHandling(error);
  }
}
export default dbConnect;
