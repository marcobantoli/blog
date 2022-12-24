import React from 'react';
import MyPost from './MyPost.js';
import './styles/MyPostsList.css';

function MyPostsList({ myPosts, handleDelete }) {
  return (
    <ul className="myposts-container">
      {myPosts.map(myPost => <MyPost datePosted={myPost.date_posted} title={myPost.title} content={myPost.content} id={myPost.post_id} handleDelete={handleDelete} key={myPost.post_id} />)}
    </ul>
  );
}

export default MyPostsList;
