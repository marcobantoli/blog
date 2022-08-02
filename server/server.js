const express = require('express');
const pool = require('./db.js');
const bcrypt = require('bcrypt');

const PORT = 3000;

const app = express();
app.use(express.json());

app.post('/users', (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { username: req.body.username, password: hashedPassword };
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
