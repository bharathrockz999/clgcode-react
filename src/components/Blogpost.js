import React from 'react';

const Blogpost = ({ post, openSignInPopup }) => {
  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      <p>{post.date}</p>
      <p>{post.content}</p>
      <button onClick={openSignInPopup}>Read More</button>
    </div>
  );
};

export default Blogpost;
