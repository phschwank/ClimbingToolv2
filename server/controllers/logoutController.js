const connectDB = require('../config/dbConn');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    // check if refresh token exists
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    try {
        const pool = await connectDB();
        // check if refresh token exists in db
        const user = await pool.query("SELECT * FROM users WHERE refresh_token = $1", [refreshToken]);
        // check if user exists
        if (user.rows.length === 0) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204);
        }

        // delete refreshToken in db
        await pool.query("UPDATE users SET refresh_token = NULL WHERE refresh_token = $1", [refreshToken]);
        
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleLogout }