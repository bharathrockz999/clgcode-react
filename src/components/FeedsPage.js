import React, { useState, useEffect } from 'react';
import './FeedPage.css';

const FeedsPage = () => {
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState({});
  const [commentInput, setCommentInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasRefreshed, setHasRefreshed] = useState(false);
  const hasPageBeenRefreshed = localStorage.getItem('hasPageBeenRefreshed');
  
  const fetchData = async (pageNumber) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No JWT token found.');
        return;
      }

      const response = await fetch(`/blog/page/get`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageNumber: pageNumber-1,
          noOfRecords: 5,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data.response);
        setTotalPages(data.totalPages);
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredPosts = posts.filter((post) =>
    post.sub.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No JWT token found.');
        return;
      }

      const response = await fetch(`/blog/like/${postId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedPosts = posts.map((post) => {
          if (post.id === postId) {
            return { ...post, likes: post.likes + 1 };
          }
          return post;
        });
        setPosts(updatedPosts);
      } else {
        console.error('Error liking post:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while liking post:', error);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No JWT token found.');
        return;
      }

      const response = await fetch(`/blog/unlike/${postId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedPosts = posts.map((post) => {
          if (post.id === postId) {
            return { ...post, unlikes: post.unlikes + 1 };
          }
          return post;
        });
        setPosts(updatedPosts);
      } else {
        console.error('Error unliking post:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while unliking post:', error);
    }
  };

  const handleShowComments = (postId) => {
    setShowComments((prevShowComments) => ({
      ...prevShowComments,
      [postId]: !prevShowComments[postId],
    }));
  };

  const handleAddComment = async (postId, commentText) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No JWT token found.');
        return;
      }
  
      const response = await fetch(`/blog/addcomment/${postId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: commentText }), // Send the comment text
      });
  
      if (response.ok) {
        const updatedPosts = posts.map((post) => {
          if (post.id === postId) {
            post.comments = Array.isArray(post.comments) ? post.comments : [];
            post.comments.push({ text: commentText });
          }
          return post;
        });
        setPosts(updatedPosts);
        setCommentInput(''); 
      } else {
        console.error('Error adding comment:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while adding comment:', error);
    }
  };


  useEffect(() => {
    
    fetchData(currentPage); 
  }, [currentPage]);
  

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="feeds-container">
    <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button className="search-button">Search</button>
      </div>
      {Array.isArray(filteredPosts) &&
        filteredPosts.map((post) => (
          <div className="feed-card" key={post.id}>
          <h2>{post.sub}</h2>
          <p>{post.desc}</p>

            <div className="interaction">
              <button className="interaction-button" onClick={() => handleLike(post.id)}>
                Likes ({post.likes})
              </button>
              <button className="interaction-button" onClick={() => handleUnlike(post.id)}>
                Unlikes ({post.unlikes})
              </button>
              <button className="interaction-button" onClick={() => handleShowComments(post.id)}>
                Comments
              </button>
              <button className="interaction-button">Project Requests</button>
            </div>
            {showComments[post.id] && (
              <div className="comments-section">
                {Array.isArray(post.comments) &&
                  post.comments.map((comment, index) => (
                    <div key={index} className="comment">
                      {comment.text}
                    </div>
                  ))}
                <input
                  type="text"
                  placeholder="Add a comment..."
                  onChange={(e) => setCommentInput(e.target.value)}
                  value={commentInput}
                />
                <button onClick={() => handleAddComment(post.id, commentInput)}>
                  Add Comment
                </button>
              </div>
            )}
            <div className="hidden-description">
              {post.desc.length > 20 && post.fullDesc}
            </div>
            <div className="post-created-date">
              Created on: {formatDate(post.crtdTme)}
            </div>
          </div>
        ))}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => goToPage(index + 1)}
          className={currentPage === index + 1 ? 'active' : ''}>
            {index + 1}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FeedsPage;







