import React from 'react';
import { useNavigate } from "react-router-dom";
import './MyPost.css';

function MyPost({ datePosted, title, content, id, handleDelete }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${id}`);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    navigate(`/posts/${id}/edit`);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    handleDelete(id, token);
  };

  return (
    <>
      <li className="mypost-container" onClick={handleClick}>
        <div className="my-date">
          {`${datePosted.slice(0, 10)}`}
        </div>
        <div className="my-title">
          {title}
        </div>
        <div className="my-content">
          {`${content.slice(0, 100)}...`}
        </div>
      </li>
      <div>
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </>
  );
}

export default MyPost;
