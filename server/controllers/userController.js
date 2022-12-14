require('dotenv').config();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

loginUser = async (req, res) => {
  const user = await User.get(req.body.username);

  if (!user) {
    res.sendStatus(400);
  }
  try {
    const match = await bcrypt.compare(req.body.password, user.rows[0].password);

    if (match) {
      const accessToken = jwt.sign(user.rows[0].user_id, process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessToken });
    } else {
      res.send('Not allowed');
    }
  } catch {
    res.sendStatus(500);
  }
};

registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { username: req.body.username, password: hashedPassword };

    await User.register(user.username, user.password);
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
};

getMe = async (req, res) => {
    res.json({ message: 'User data' });
};

module.exports = {
    loginUser,
    registerUser,
    getMe,
};
