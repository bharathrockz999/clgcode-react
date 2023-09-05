
import React, { useState, useEffect } from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom'; 

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showReadMorePopup, setShowReadMorePopup] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchData = async (pageNumber) => {
    try {
      const response = await fetch(`/blog/page/get`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageNumber: pageNumber - 1,
          noOfRecords: 6,
          userName: "all",
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

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const openReadMorePopup = (post) => {
    setSelectedPost(post);
    setShowReadMorePopup(true);
  };

  const closeReadMorePopup = () => {
    setSelectedPost(null);
    setShowReadMorePopup(false);
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

  const limitWords = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  const filteredPosts = posts.filter((post) =>
    post.sub.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="homepage-container">
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
          <div className="blog-card" key={post.id}>
            <h2>{post.sub}</h2>
            <p>{limitWords(post.desc, 20)}</p>
            
            <button className="read-more-button" onClick={() => openReadMorePopup(post)}>
              Read More
            </button>
          </div>
        ))}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      {selectedPost && showReadMorePopup && (
        <div className="read-more-popup">
          <div className="popup-content">
            <h2>{selectedPost.sub}</h2>
            <p>{selectedPost.desc}</p>
            <Link to="/signin">Sign In to read the full article</Link> {/* Add a Link to the Sign In page */}
            <button className="close-popup" onClick={closeReadMorePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
