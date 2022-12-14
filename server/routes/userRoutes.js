const pool = require('../config/db.js');
const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getMe } = require('../controllers/userController.js');

// <-----Auth routes----->

// POST [WORKS]
router.post('/', registerUser);

// LOGIN [WORKS]
router.post('/login', loginUser);

// GET [WORKS]
router.get('/me', getMe);

// <-----Auth routes END----->

// GET (all users) [WORKS]
router.get('/', async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM accounts');
    res.json(users.rows);
  } catch {
    res.sendStatus(500);
  }
});

// // GET (one user) [WORKS]
// app.get('/users/:id', async (req, res) => {
//   try {
//     const getUser = await pool.query('SELECT * FROM accounts WHERE user_id=$1', [req.params.id]);
//     res.json(getUser.rows[0]);
//   } catch {
//     res.sendStatus(500);
//   }
// });

// // PUT [WORKS]
// app.put('/users/:id', async (req, res) => {
//   try {
//     const hashedNewPassword = await bcrypt.hash(req.body.password, 10);
//     await pool.query('UPDATE accounts SET password=$1 WHERE user_id=$2', [hashedNewPassword, req.params.id]);
//     res.sendStatus(204);
//   } catch {
//     res.sendStatus(500);
//   }
// });

// // DELETE [WORKS]
// app.delete('/users/:id', async (req, res) => {
//   try {
//     await pool.query('DELETE FROM accounts WHERE user_id = $1', [req.params.id]);
//     res.sendStatus(204);
//   } catch {
//     res.sendStatus(500);
//   }
// });

module.exports = router;
