// src/components/Blog.js

import React from 'react';

const Blog = ({ title, date, description, onReadMoreClick }) => {
  return (
    <div className="blog">
      <h2>{title}</h2>
      <p>{date}</p>
      <p>{description}</p>
      <button onClick={onReadMoreClick}>Read More</button>
    </div>
  );
};

export default Blog;
