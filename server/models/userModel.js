const pool = require('../config/db.js');

const User = {};

User.get = (username) => {
    return pool.query('SELECT * FROM accounts WHERE username=$1', [username]);
};

User.register = (username, password) => {
    return pool.query('INSERT INTO accounts(user_id, username, password) VALUES(DEFAULT, $1, $2)', [username, password]);
};

module.exports = User;
