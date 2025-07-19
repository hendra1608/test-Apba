const { Pool } = require("pg");
require("dotenv").config();

//sql

const tableQuery = `
    CREATE TABLE users (
    kdUser UUID NOT NULL,
    username VARCHAR(50),
    password VARCHAR(80),
    name VARCHAR(100),
    hakAkses VARCHAR(20),
    kdKlinik VARCHAR(10),
    kdCabang VARCHAR(10),
    token VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
`;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
