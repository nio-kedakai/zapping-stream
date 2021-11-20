
const mysql2 = require('mysql2/promise');
const dotenv = require("dotenv");

dotenv.config();

const conexion = mysql2.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'zapping',
    database: process.env.DB_NAME || 'zapping_db',
    port: process.env.DB_PORT || '3000',
    multipleStatements: true,
    //waitForConnections: true,
    connectionLimit: 10
});




module.exports = conexion;