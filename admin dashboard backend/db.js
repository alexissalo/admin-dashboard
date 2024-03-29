import {createPool} from "mysql2/promise"

const pool = new createPool({
  user: "root",
  password: "alexis49",
  host: "localhost",
  port: 3306,
  database: "admindashboard",
});

export default pool;