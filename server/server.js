const express = require('express');
const pool = require('./db.js');
const bcrypt = require('bcrypt');
const { response, query } = require('express');

const PORT = 3001;

const app = express();
app.use(express.json());

// <----------Posts routes---------->

// GET (all posts) [WORKS]
app.get('/posts', async (req, res) => {
  try {
    const posts = await pool.query('SELECT * FROM posts');
    res.json(posts.rows);
  } catch {
    res.sendStatus(500);
  }
});

// POST [WORKS]
app.post('/posts', async (req, res) => {
  try {
    const date = getCurrentDate();
    const title = req.body.title;
    const content = req.body.content;
    const userId = req.body.userId;

    await pool.query('INSERT INTO posts(post_id, date_posted, title, content, user_id) VALUES(DEFAULT, $1, $2, $3, $4)', [date, title, content, userId]);
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
});

// GET (one post) [WORKS]
app.get('/posts/:id', async (req, res) => {
  try {
    const getPost = await pool.query('SELECT * FROM posts WHERE post_id=$1', [req.params.id]);
    res.json(getPost.rows[0]);
  } catch {
    res.sendStatus(500);
  }
});

// PUT [WORKS]
app.put('/posts/:id', async (req, res) => {
  try {
    const newTitle = req.body.title;
    const newContent = req.body.content;
    await pool.query('UPDATE posts SET title = $1, content = $2 WHERE post_id = $3', [newTitle, newContent, req.params.id]);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

// DELETE [WORKS]
app.delete('/posts/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM posts WHERE post_id = $1', [req.params.id]);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

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
      res.send('Success');
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


function getCurrentDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;
  return today;
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
