const express = require('express');
const router = express.Router();
const { getPosts, getPost, setPost, updatePost, deletePost } = require('../controllers/postController.js');

// GET (all posts) [WORKS]
router.get('/', getPosts);

// POST [WORKS]
router.post('/', setPost);

// GET (one post) [WORKS]
// router.get('/:id', getPost);

// PUT [WORKS]
router.put('/:id', updatePost);

// DELETE [WORKS]
router.delete('/:id', deletePost);

module.exports = router;
