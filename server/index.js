const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// middleware
app.use(cors());
app.use(express.json());

// ROUTES //

// import routes from external files


app.listen(5000, () => {
    console.log('Server is running on port 5000');
    });
