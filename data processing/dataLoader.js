
const connectDB = require('./dbConn');
const fs = require("fs");
const fastcsv = require("fast-csv");

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
                    refresh_token VARCHAR(255),
                    content JSONB)
                    `);
                break
            case 'spots':
                await pool.query(`CREATE TABLE IF NOT EXISTS spots (
                    spotname VARCHAR(255) PRIMARY KEY,
                    canton VARCHAR(50) DEFAULT NULL,
                    country VARCHAR(50) DEFAULT NULL,
                    latitude NUMERIC DEFAULT NULL,
                    longitude NUMERIC DEFAULT NULL, 
                    content JSONB)
                `);
                break 
            case 'routes':
                await pool.query(`CREATE TABLE IF NOT EXISTS routes (
                    routename VARCHAR(255),
                    spotname VARCHAR(255),
                    grade VARCHAR(3) NOT NULL,
                    content JSONB,
                    PRIMARY KEY (routename, spotname),
                    FOREIGN KEY (spotname) REFERENCES spots (spotname) ON DELETE CASCADE)
                `);
                break 
            // zusammengesetzter Foreign Key nötig damit UNIQUE Constraint erfüllt ist
            case 'user_routes':
                await pool.query(`CREATE TABLE IF NOT EXISTS user_routes (
                    username VARCHAR(255),
                    routename VARCHAR(255),
                    spotname VARCHAR(255),
                    content JSONB,
                    PRIMARY KEY(username, routename),
                    FOREIGN KEY (username) REFERENCES users (username) ON DELETE CASCADE,
                    FOREIGN KEY (routename, spotname) REFERENCES routes (routename, spotname) ON DELETE CASCADE)
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
                var query = `INSERT INTO users (username, roles, password, refresh_token, content) VALUES ($1, $2, $3, $4, $5)`
                break
            case 'spots':
                var query = `INSERT INTO spots (spotname, canton, country, latitude, longitude, content) VALUES ($1, $2, $3, $4, $5, $6)`
                break
            case 'routes':
                var query = `INSERT INTO routes (routename, spotname, grade, content) VALUES ($1, $2, $3, $4)`
                break
            case 'user_routes':
                var query = `INSERT INTO user_routes (username, routename, spotname, content) VALUES ($1, $2, $3, $4)`
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

async function doWork() {
    const tableNames = ["users", "spots", "routes", "user_routes"];
    try {
        for (element of tableNames) {
            await dropDBTable(element);
            await createDBTable(element);
            await runWorkflow(element);
        };
    }
    catch (error) {
        console.log(error.message);
    }
}

doWork();