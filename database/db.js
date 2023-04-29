import { Pool } from "pg";

let db;

if (!db){
    db = new Pool({
        user: process.env.PGSQL_USER,
        password: process.env.PGSQL_PASSWORD,
        database: process.env.PGSQL_DATABASE,
        port: process.env.PGSQL_PORT,
        host: process.env.PGSQL_HOST
    })
}

export default db;
