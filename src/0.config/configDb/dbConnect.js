import Pool from "pg-poll"
import * as dotenv from "dotenv";
import errorHandling from "../../2.service/errorHandling/errorHandling.js"

async function dbConnect () {
    try {
    const pool = new Pool({
        connectionString: `postrgress://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_URL}/${process.env.DB_NAME}`});
    const client = await pool.connect();
    
    }catch(error) {errorHandling(error)}
}