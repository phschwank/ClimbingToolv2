const jwt = require('jsonwebtoken');
const connectDB = require('../config/dbConn');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    // check if refresh token exists
    if (!cookies?.jwt) return res.sendStatus(401); // no refresh token: unauthorized
    const refreshToken = cookies.jwt;

    try {
        const pool = await connectDB();
        // check if refresh token exists in db
        const user = await pool.query("SELECT * FROM users WHERE refresh_token = $1", [refreshToken]);
        // check if user exists
        if (user.rows.length === 0) {
            return res.sendStatus(403); // forbidden
        }

        // evaluate jwt
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || user.rows[0].username !== decoded.username) return res.sendStatus(403); // forbidden
                const roles = user.rows[0].roles.split(',');
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "username": decoded.username,
                            "roles": roles
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '10s' }
                );
                res.json({ roles, accessToken });
            }
        );
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleRefreshToken }