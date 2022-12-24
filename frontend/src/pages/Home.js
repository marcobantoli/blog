import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList.js';
import Axios from 'axios';
import './styles/Home.css';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Axios.get('/api/posts')
      .then(function (response) {
        const posts = response.data;
        setPosts(posts);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="latest-posts">Latest Posts</div>
      <PostList posts={posts} />
    </>
  );
}

export default Home;
