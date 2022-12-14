const postModel = require('../models/postModel.js');

const getPosts = async (req, res) => {
  try {
    const posts = await postModel.get();
    res.json(posts.rows);
  } catch {
    res.sendStatus(500);
  }
};

const setPost = async (req, res) => {
  try {
    const date = getCurrentDate();
    const title = req.body.title;
    const content = req.body.content;
    const userId = req.body.userId;

    await postModel.create(date, title, content, userId);
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
};

const updatePost = async (req, res) => {
  try {
    const newTitle = req.body.title;
    const newContent = req.body.content;
    await postModel.update(newTitle, newContent, req.params.id);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
};

const deletePost = async (req, res) => {
  try {
    await postModel.delete(req.params.id);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
};


function getCurrentDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;
  return today;
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
};
