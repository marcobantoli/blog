import React from 'react'
import './Post.css';

function Post({ datePosted, title, content, id }) {
  return (
    <li className="post-container">
        <div className="date">
            {datePosted.slice(0, 10)}
        </div>
        <div className="title">
            {title}
        </div>
        <div className="content">
            {content}
        </div>
    </li>
  );
}

export default Post
