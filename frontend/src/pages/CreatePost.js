import React, { useState } from 'react';
import './styles/CreatePost.css';

function CreatePost({ handleCreate }) {
  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    handleCreate(formData.title, formData.content, token);
  };

  return (
    <>
      <form className="create-container" onSubmit={handleSubmit}>
        <input className="input-title" type="text" name="title" required value={formData.title} placeholder="Title" onChange={handleChange} />
        <textarea className="input-content" name="content" required value={formData.content} placeholder="Write your ideas..." rows="10" onChange={handleChange}></textarea>
        <button className="create-button" type="submit">Create</button>
      </form>
    </>
  );
};

export default CreatePost;
