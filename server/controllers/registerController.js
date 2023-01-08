const bcrypt = require('bcrypt');
const connectDB = require('../config/dbConn');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    // check if all fields are filled
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    // create a new user
    try {
        const pool = await connectDB();
        // check if user already exists
        const userExists = await pool.query("SELECT * FROM users WHERE username = $1;", [user]);
        if (userExists.rows.length > 0) {
            // user already exists: conflict
            return res.sendStatus(409);
        }
        // hash the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // insert the new user
        try {
            await pool.query("BEGIN;");
            const newUser = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;", [user, hashedPwd]);
            console.log(newUser.rows[0]);
            const newUserInfo = await pool.query("INSERT INTO users_info (username) VALUES ($1) RETURNING *;", [user]);
            console.log(newUserInfo.rows[0]);
            await pool.query("COMMIT;");
            // return the new user
            res.status(201).json({ 'success': `New user ${user} created!` });
        } catch (err) {
            await pool.query("ROLLBACK;");
            res.status(500).json({ 'message': err.message });
        }
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };