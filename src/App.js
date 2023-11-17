// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BoardList from './components/BoardList';
import PostEditor from './components/PostEditor';
import styled from 'styled-components';

const AppContainer = styled.div`
  padding: 20px;
  font-family: sans-serif;
`;

const Header = styled.header`
  background-color: #123456;
  color: #fff;
  padding: 10px 20px;
  text-align: center;
  margin-bottom: 30px;
`;

const AddPostLink = styled(Link)`
  color: white;
  text-decoration: none;
  background-color: #345678;
  padding: 10px 15px;
  border-radius: 5px;
  display: inline-block;
  margin: 10px 0;
`;

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch all boards when the component mounts
    fetch('http://localhost:8080/api/boards')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const addPost = (newPost) => {
    // Add a post to the server
    fetch('http://localhost:8080/api/boards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    })
    .then((response) => response.json())
    .then((data) => {
      // Update the local state with the new post from the server
      setPosts([...posts, data]);
    })
    .catch((error) => console.error('Error adding post:', error));
  };

  const updatePost = (id, updatedPost) => {
    // Update the post on the server
    fetch(`http://localhost:8080/api/boards/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    })
    .then((response) => response.json())
    .then(() => {
      // Update the local state with the updated post
      console.log("test")
      setPosts(posts.map((post) => (post.id === id ? updatedPost : post)));
    })
    .catch((error) => console.error('Error updating post:', error));
  };

  return (
    <Router>
      <AppContainer>
        <Header>
          <h1>React Markdown Board</h1>
          <AddPostLink to="/edit/new">Create New Post</AddPostLink>
        </Header>
        <Routes>
          <Route path="/" element={<BoardList posts={posts} />} />
          <Route path="/edit/:postId" element={<PostEditor posts={posts} addPost={addPost} updatePost={updatePost} />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;

