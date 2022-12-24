import React, { useState } from 'react';
import './styles/LoginRegister.css';

function Login({ handleLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData.username, formData.password);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input name="username" className="input-box" type="text" placeholder="Enter your username" value={formData.username} onChange={handleChange} />
      <input name="password" className="input-box" type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
      <button className="submit-button" type="submit">Login</button>
    </form>
  );
}

export default Login;
