const mysql = require('mysql2/promise');
require('dotenv').config();


const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,             // Utilisateur par défaut MySQL
  password: process.env.PASS,
  database: process.env.DB,   // Votre base MySQL
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;