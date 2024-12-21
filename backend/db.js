const mysql = require("mysql2");
require("dotenv").config();

const dbconnect = mysql.createConnection({
  host: process.env.DB_host || "localhost",
  user: process.env.DB_user || "root",
  password: process.env.DB_password || "root123",
  database: process.env.DB_database || "empmanage",
});

dbconnect.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB Connection succesfull");
  }
});

module.exports = dbconnect;
