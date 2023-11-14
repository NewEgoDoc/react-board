// src/components/PostEditor.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';

const EditorContainer = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    opacity: 0.8;
  }
`;

const SaveButton = styled(Button)`
  background-color: #4caf50;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #f44336;
  color: white;
`;

function PostEditor({ addPost, updatePost }) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const isEditing = postId !== "new";
  const [post, setPost] = useState({ title: '', content: '' });

  useEffect(() => {
    if (isEditing) {
      fetch(`http://localhost:8080/api/boards/${postId}`)
        .then(response => response.json())
        .then(data => setPost(data))
        .catch(error => console.error('Error fetching post:', error));
    }
  }, [postId, isEditing]);

  const handleSave = () => {
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `http://localhost:8080/api/boards/${postId}` : 'http://localhost:8080/api/boards';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(data => {
      if (isEditing) {
        updatePost(postId, data);
      } else {
        addPost(data);
      }
      navigate('/');
    })
    .catch(error => console.error('Error saving post:', error));
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleChange = (key, value) => {
    setPost(prevPost => ({
      ...prevPost,
      [key]: value
    }));
  };

  return (
    <EditorContainer>
      <input
        type="text"
        value={post.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Post title"
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <MDEditor
        value={post.content}
        onChange={(value) => handleChange('content', value)}
        height={500}
      />
      <div>
        <SaveButton onClick={handleSave}>Save</SaveButton>
        <CancelButton onClick={handleCancel}>Cancel</CancelButton>
      </div>
    </EditorContainer>
  );
}

export default PostEditor;

