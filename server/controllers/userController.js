require('dotenv').config();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const user = await User.get(req.body.username);

  if (!user) {
    res.sendStatus(400);
  }
  try {
    const match = await bcrypt.compare(req.body.password, user.rows[0].password);
    
    if (match) {
      const accessToken = generateToken(user.rows[0].user_id);
      res.status(201).json({ accessToken });
    } else {
      res.send('Not allowed');
    }
  } catch {
    res.sendStatus(500);
  }
};

const registerUser = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.sendStatus(400);
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const returnVal = await User.register(req.body.username, hashedPassword);
    const userId = returnVal.rows[0].user_id;

    res.status(201).json({ token: generateToken(userId) });
  } catch {
    res.sendStatus(500);
  }
};

const getMe = async (req, res) => {
    const userId = req.userId;

    const getUser =  await User.getById(userId);

    const username = getUser.rows[0].username;

    res.status(200).json({ username: username, userId: userId });
};

const generateToken = (id) => {
  return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = {
    loginUser,
    registerUser,
    getMe,
};
