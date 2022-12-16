const pool = require('../config/db.js');

const Post = {};

Post.create = (title, content, userId) => {
    return pool.query('INSERT INTO posts(post_id, date_posted, title, content, user_id) VALUES(DEFAULT, DEFAULT, $1, $2, $3)', [title, content, userId]);
};

Post.get = () => {
    return pool.query('SELECT * FROM posts');
}

Post.update = (newTitle, newContent, id) => {
    return pool.query('UPDATE posts SET title = $1, content = $2 WHERE post_id = $3', [newTitle, newContent, id]);
}

Post.delete = (id) => {
    return pool.query('DELETE FROM posts WHERE post_id=$1', [id]);
}

Post.getById = (id) => {
    return pool.query('SELECT * FROM posts WHERE post_id=$1', [id]);
}

module.exports = Post;
