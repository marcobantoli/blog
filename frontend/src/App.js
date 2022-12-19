import React from 'react'
import Navbar from './components/Navbar';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [user, setUser] = useState({
    username: '',
    userId: ''
  });

  const handleLogout = (event) => {
    setUser({
      username: '',
      userId: ''
    });
  };

  const handleLogin = async (username, password) => {
    Axios.post('/api/users/login', {
        username: username,
        password: password
      })
      .then(function (response) {
        const accessToken = response.data.accessToken;
        localStorage.setItem("token", accessToken);
      })
      .catch(function (error) {
        console.log(error);
      });

    setUser({
      username: username,
      userId: password
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
      })
      .catch(function (error) {
        console.log(error);
      });

    setUser({
      username: username,
      userId: password
    });
  };

  return (
    <>
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/register" element={<Register handleRegister={handleRegister} />} />
      </Routes>
    </>
  );
}

export default App;
