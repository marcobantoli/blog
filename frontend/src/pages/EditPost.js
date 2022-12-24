import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import './styles/EditPost.css';

function EditPost({ handleUpdate }) {
  const [postInfo, setPostInfo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    loadPostInfo();
  }, []);

  const handleChange = (e) => {
    setPostInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    handleUpdate(postInfo.title, postInfo.content, id, token);
  };

  const loadPostInfo = () => {
    Axios.get(`/api/posts/${id}`)
      .then(function (response) {
        const post = response.data;
        const postUserId = post.user_id;

        getUsername(postUserId)
          .then(function(data) {
            setPostInfo({
              username: data,
              datePosted: post.date_posted.slice(0,10),
              title: post.title,
              content: post.content
            })
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getUsername = async (userId) => {
    const response = await Axios.get(`/api/users/${userId}`);
    const data = await response.data;
    return data.username;
  };

  return (
    <main className="main-container">
      <div className="header-container">
        <div className="username-container">
          {postInfo.username}
        </div>
        <div className="date-container">
          {postInfo.datePosted}
        </div>
      </div>
      <form className="edit-container" onSubmit={handleSubmit}>
        <input className="edit-title" type="text" name="title" value={postInfo.title} required onChange={handleChange} />
        <textarea className="edit-content" name="content" value={postInfo.content} required rows="10" onChange={handleChange} />
        <button className="edit-button" type="submit">Edit</button>
      </form>
    </main>
  );
}

export default EditPost;
