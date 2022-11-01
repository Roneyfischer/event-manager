import Pool from "pg-pool";
import * as dotenv from "dotenv";
import errorHandling from "../../2.service/errorHandling/errorHandling.js";

async function dbConnect() {
  try {
    const pool = new Pool({
      connectionString: `postgress://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_URL}/${process.env.DB_NAME}`,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    const client = await pool.connect();
    console.log("Pool has been created!");

    return client;
  } catch (error) {
    errorHandling(error.message);
  }
}
export default dbConnect;
