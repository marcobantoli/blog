import React from 'react'
import Post from '../components/Post.js';
import './PostList.css';

function PostList({ posts }) {
  return (
    <ul className="list-container">
      {posts.map(post => <Post datePosted={post.date_posted} title={post.title} content={post.content} key={post.post_id} />)}
    </ul>
  );
}

export default PostList