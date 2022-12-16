const express = require('express');
const router = express.Router();
const { getPosts, setPost, updatePost, deletePost, getPost } = require('../controllers/postController.js');
const { protect } = require('../middleware/authMiddleware.js');

// GET (all posts) [WORKS]
router.get('/', getPosts);

// POST [WORKS]
router.post('/', protect, setPost);

// PUT [WORKS]
router.put('/:id', protect, updatePost);

// DELETE [WORKS]
router.delete('/:id', protect, deletePost);


// GET (one post) [WORKS]
// router.get('/:id', getPost);

module.exports = router;
