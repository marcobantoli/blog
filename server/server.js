require('dotenv').config();
const express = require('express');

const posts = require('./routes/postRoutes.js');
const users = require('./routes/userRoutes.js');

const PORT = 3001;

const app = express();
app.use(express.json());

app.use('/api/posts', posts);
app.use('/api/users', users);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
