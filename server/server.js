require('dotenv').config();
const express = require('express');
const pool = require('./config/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const posts = require('./routes/postRoutes.js');

const PORT = 3001;

const app = express();
app.use(express.json());

// Posts routes
app.use('/api/posts', posts);

// <----------Users routes---------->

// <-----Auth routes----->
// POST [WORKS]
app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { username: req.body.username, password: hashedPassword };
    await pool.query('INSERT INTO accounts(user_id, username, password) VALUES(DEFAULT, $1, $2)', [user.username, user.password]);
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
});

// LOGIN [WORKS]
app.post('/users/login', async (req, res) => {
  const user = await pool.query('SELECT * FROM accounts WHERE username=$1', [req.body.username]);
  if (!user) {
    res.sendStatus(400);
  }
  try {
    if (await bcrypt.compare(req.body.password, user.rows[0].password)) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessToken: accessToken });
    } else {
      res.send('Not allowed');
    }
  } catch {
    res.sendStatus(500);
  }
});
// <-----Auth routes END----->

// GET (all users) [WORKS]
app.get('/users', async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM accounts');
    res.json(users.rows);
  } catch {
    res.sendStatus(500);
  }
});

// GET (one user) [WORKS]
app.get('/users/:id', async (req, res) => {
  try {
    const getUser = await pool.query('SELECT * FROM accounts WHERE user_id=$1', [req.params.id]);
    res.json(getUser.rows[0]);
  } catch {
    res.sendStatus(500);
  }
});

// PUT [WORKS]
app.put('/users/:id', async (req, res) => {
  try {
    const hashedNewPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query('UPDATE accounts SET password=$1 WHERE user_id=$2', [hashedNewPassword, req.params.id]);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

// DELETE [WORKS]
app.delete('/users/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM accounts WHERE user_id = $1', [req.params.id]);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
