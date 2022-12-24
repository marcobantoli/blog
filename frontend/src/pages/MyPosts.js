import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import MyPostsList from '../components/MyPostsList';
import './MyPosts.css';

function MyPosts() {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    Axios.get('/api/posts/me', config)
      .then(function (response) {
        const myPosts = response.data;
        setMyPosts(myPosts);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const handleDelete = async (id, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    Axios.delete(`/api/posts/${id}`, config)
      .then(function (response) {
        alert('Deleted: ' + response.status);
      })
      .catch(function (err) {
        alert(err.message);
      });

    setMyPosts(prevState => 
      prevState.filter(post => {
        return post.post_id !== id;
      })
    );
  };

  return (
    <>
      <div className="my-posts">My Posts</div>
      <MyPostsList myPosts={myPosts} handleDelete={handleDelete} />
    </>
  );
}

export default MyPosts;
