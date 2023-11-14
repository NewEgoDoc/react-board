// src/components/BoardList.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const List = styled.div`
  margin: 20px 0;
`;

const PostLink = styled(Link)`
  display: block;
  color: #000;
  text-decoration: none;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const BoardList = ({ posts }) => (
  <List>
    {posts.map((post, index) => (
      <PostLink key={index} to={`/edit/${index}`}>
        {post.title || `Untitled Post ${index + 1}`}
      </PostLink>
    ))}
  </List>
);

export default BoardList;

