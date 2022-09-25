const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const pool = require('./db');

// middleware
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
    key: "userId",
    secret: "I am a secret for the session.", // TODO: change this
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24, // 1 day
    },
}));


// ROUTES //

// import routes from external files


app.listen(5000, () => {
    console.log('Server is running on port 5000');
    });
