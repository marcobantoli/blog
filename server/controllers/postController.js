const Post = require('../models/postModel.js');

// All posts (from everyone)
const getPosts = async (req, res) => {
  try {
    const posts = await Post.get();
    res.status(200).json(posts.rows);
  } catch {
    console.log('Error');
  }
};

const setPost = async (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const userId = req.userId;

    await Post.create(title, content, userId);
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
};

// should be only allowed to delete/update own posts

const updatePost = async (req, res) => {
  try {
    const newTitle = req.body.title;
    const newContent = req.body.content;
    const post = await Post.getById(req.params.id);

    const postUserId = post.rows[0].user_id;

    if (postUserId !== req.userId) {
      res.status(401);
    }

    await Post.update(newTitle, newContent, req.params.id);
    res.status(204);
  } catch {
    res.status(500);
  }
  
  res.send();
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const findPost = await Post.getById(postId);
    const postUserId = findPost.rows[0].user_id;
    const loggedInUser = req.userId;
    
    if (loggedInUser !== postUserId) {
      res.status(401);
    }

    await Post.delete(postId);
    res.status(204);
  } catch {
    res.status(500);
  }

  res.send();
};

// const getPost = async (req, res) => {
//   try {
//     const getPost = await pool.query('SELECT * FROM posts WHERE post_id=$1', [req.params.id]);
//     res.json(getPost.rows[0]);
//   } catch {
//     res.sendStatus(500);
//   }
// };

module.exports = {
    getPosts,
    setPost,
    updatePost,
    deletePost,
    // getPost,
};
