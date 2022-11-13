const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require('../config/dbConn');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    // check if all fields are filled
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    try {
        const pool = await connectDB();
        // check if user exists
        const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [user]);
        if (userExists.rows.length === 0) {
            // user does not exist: not found, therefore unauthorized
            return res.sendStatus(401);
        }
        // check if password is correct
        const isPwdCorrect = await bcrypt.compare(pwd, userExists.rows[0].password);
        if (isPwdCorrect) {
            const roles = userExists.rows[0].roles.split(',');

            // create JWTs
            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "username": userExists.rows[0].username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            const refreshToken = jwt.sign(
                { "username": userExists.rows[0].username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // save refresh token to db
            await pool.query("UPDATE users SET refresh_token = $1 WHERE username = $2", [refreshToken, userExists.rows[0].username]);

            // create secure cookie with refresh token
            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            // send authorization roles and access token to user
            res.json({ roles, accessToken });
        } else {
            // password is incorrect: unauthorized
            res.sendStatus(401);
        }
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleLogin };