
const connectDB = require('../server/config/dbConn');
const fs = require("fs");
const fastcsv = require("fast-csv");
var async = require('async');

const dropDBTable = async (tableName, res) => {
    try {
        const pool = await connectDB();
        await pool.query(`DROP TABLE IF EXISTS ${tableName} CASCADE`);
        console.log(`table ${tableName} dropped successfully`)
    } catch (error) {
        console.log(error.message);
    }
};

const createDBTable = async (tableName,res) => {
    try {
        const pool = await connectDB();
        switch (tableName) {
            case 'users':
                await pool.query(`CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    username VARCHAR(20) UNIQUE NOT NULL,
                    roles VARCHAR(20) DEFAULT '2001',
                    password VARCHAR(255) NOT NULL,
                    refresh_token VARCHAR(255))
                    `);
                break
            case 'users_info':
                await pool.query(`CREATE TABLE IF NOT EXISTS users_info (
                    username VARCHAR(255) PRIMARY KEY,
                    weight NUMERIC DEFAULT NULL,
                    height SMALLINT DEFAULT NULL,
                    FOREIGN KEY (username) REFERENCES users (username))
                `);
                break
            default:
                console.log('No correct Database found');
                return;
        }
        console.log(`Table ${tableName} created successfully`)
    } catch (error) {
        console.log(error.message);
    }
};

const insertDataToDB = async (data, tableName, res) => {
    try {
        const pool = await connectDB();
        switch (tableName) {
            case 'users':
                var query = `INSERT INTO users (id, username, roles, password, refresh_token) VALUES ($1, $2, $3, $4, $5)`
                break
            case 'users_info':
                var query = `INSERT INTO users_list (username, weight, height) VALUES ($1, $2, $3)`
                break
            default:
                console.log('No correct Database found');
                return
        }
        data.forEach(row => {
             pool.query(query, row, (error, res) => {
                if (error) {
                    console.log(error.stack);
                };
            });
        });
        console.log(`Data inserted to ${tableName}`);
    } catch (error) {
        console.log(error.message);
    };
};

const runWorkflow = async (tableName) => {
    let stream = await fs.createReadStream(`test-data/${tableName}.csv`);
    let csvData = [];
    let csvStream = await fastcsv.parse({delimiter: ';'})
        .on("data", function(data) {
            csvData.push(data);
        })
        .on("end", function() {
        // remove the first line: header
        csvData.shift();
        // insert data to database
        insertDataToDB(csvData, tableName)
    });
    stream.pipe(csvStream);
};


const tableNames = ["users"]//,"users_info"]
// first drop all existing tables
async.eachSeries(tableNames, dropDBTable);
// create new Table
async.eachSeries(tableNames, createDBTable);
// read data and insert it into the database
//async.eachSeries(tableNames, runWorkflow);