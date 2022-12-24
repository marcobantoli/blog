import React from 'react';
import { useNavigate } from "react-router-dom";
import './styles/Post.css';

function Post({ datePosted, title, content, id }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${id}`);
  };

  return (
    <li className="post-container" onClick={handleClick}>
        <div className="date">
            {`${datePosted.slice(0, 10)}`}
        </div>
        <div className="title">
            {title}
        </div>
        <div className="content">
            {`${content.slice(0, 100)}...`}
        </div>
    </li>
  );
}

export default Post;
