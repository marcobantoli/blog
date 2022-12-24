import React from 'react'
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import PostPage from './pages/PostPage.js';
import CreatePost from './pages/CreatePost.js';
import MyPosts from './pages/MyPosts.js';
import EditPost from './pages/EditPost.js';

function App() {
  const [user, setUser] = useState({
    username: '',
    userId: ''
  });

  const navigate = useNavigate();

  const handleLogout = (event) => {
    setUser({
      username: '',
      userId: ''
    });

    localStorage.removeItem('token');
    navigate('/');
  };

  const handleLogin = async (username, password) => {
    Axios.post('/api/users/login', {
        username: username,
        password: password
      })
      .then(function (response) {
        const accessToken = response.data.accessToken;
        localStorage.setItem("token", accessToken);

        setUser({
          username: username,
          userId: password
        });

        navigate('/');
      })
      .catch(function (error) {
        console.log(error);
        alert(error.message);
      });
  }

  const handleRegister = async (username, password) => {
    Axios.post('/api/users', {
        username: username,
        password: password
      })
      .then(function (response) {
        const accessToken = response.data.token;
        localStorage.setItem("token", accessToken);

        setUser({
          username: username,
          userId: password
        });

        navigate('/');
      })
      .catch(function (error) {
        console.log(error);
        alert(error.message);
      });
  };

  const handleCreate = async (title, content, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const postData = {
      title,
      content
    }

    Axios.post('/api/posts', postData, config)
      .then(function (response) {
        alert('Created: ' + response.status);
        navigate('/me/posts');
      })
      .catch(function (err) {
        alert(err.message);
      });
  };

  const handleUpdate = async (title, content, id, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const changes = {
      title,
      content
    };

    Axios.put(`/api/posts/${id}`, changes, config)
      .then(function (response) {
        alert('Updated: ' + response.status);
        navigate(`/posts/${id}`);
      })
      .catch(function (err) {
        alert(err.message);
      });
  };

  return (
    <>
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/register" element={<Register handleRegister={handleRegister} />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/me/posts" element={<MyPosts />} />
        <Route path="/create" element={<CreatePost handleCreate={handleCreate} />} />
        <Route path="/posts/:id/edit" element={<EditPost handleUpdate={handleUpdate} />} />
      </Routes>
    </>
  );
}

export default App;
