const Pool = require('pg').Pool;
require('dotenv').config();

const credentials = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
}

const connectDB = async () => {
    try {
        const pool = new Pool(credentials);
        return pool;
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;