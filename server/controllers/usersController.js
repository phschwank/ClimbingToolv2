const connectDB = require('../config/dbConn');

const getAllUsers = async (req, res) => {
    const pool = await connectDB();
    try {
        const users = await pool.query("SELECT * FROM users");
        if (users.rows.length === 0) {
            return res.status(204).json({ 'message': 'No users found' }); // no content
        }
        res.json(users.rows);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const deleteUser = async (req, res) => {
        // check if necessary fields are filled
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });

    const pool  = await connectDB();
    try {
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [req.body.id]);
        if (user.rows.length === 0) {
            return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
        }
        await pool.query("DELETE FROM users WHERE id = $1", [req.body.id]);
        res.json({ 'message': `User ID ${req.body.id} deleted` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getUser = async (req, res) => {
    // check if necessary fields are filled
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });

    const pool  = await connectDB();
    try {
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
        if (user.rows.length === 0) {
            return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
        }
        res.json(user.rows[0]);
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser
}