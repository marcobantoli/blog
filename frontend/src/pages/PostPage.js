import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import './styles/PostPage.css';

function PostPage() {
  const { id } = useParams();
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = () => {
    Axios.get(`/api/posts/${id}`)
      .then(function (response) {
        const post = response.data;
        const postUserId = post.user_id;

        getUsername(postUserId)
          .then(function(data) {
            setPageInfo({
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
          {pageInfo.username}
        </div>
        <div className="date-container">
          {pageInfo.datePosted}
        </div>
      </div>
      <div className="content-container">
        <h1 className="title-container">
          {pageInfo.title}
        </h1>
        <p className="paragraphs-container">
          {pageInfo.content}
        </p>
      </div>
    </main>
  );
}

export default PostPage;
