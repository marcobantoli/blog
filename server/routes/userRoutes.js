const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getMe, getAllUsers, getUser } = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware.js');

// <-----Auth routes----->

// POST [WORKS]
router.post('/', registerUser);

// LOGIN [WORKS]
router.post('/login', loginUser);

// GET [WORKS]
router.get('/me', protect, getMe);

// <-----Auth routes END----->

// GET (all users) [WORKS]
router.get('/', getAllUsers);

// GET (one user) [WORKS]
router.get('/:id', getUser);

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
