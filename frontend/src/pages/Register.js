import React, { useState } from 'react';
import './styles/LoginRegister.css';

function Register({ handleRegister }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
    } else {
      handleRegister(formData.username, formData.password);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input name="username" value={formData.username} className="input-box" type="text" placeholder="Username" onChange={handleChange} />
      <input name="password" value={formData.password} className="input-box" type="password" placeholder="Password" onChange={handleChange} />
      <input name="confirmPassword" value={formData.confirmPassword} className="input-box" type="password" placeholder="Confirm Password" onChange={handleChange} />
      <button className="submit-button" type="submit">Register</button>
    </form>
  );
}

export default Register;
