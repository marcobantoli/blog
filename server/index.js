const express = require('express');
const pool = require('./db.js');

const PORT = 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
