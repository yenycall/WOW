import React, { useState, useEffect } from 'react';
import '../styles/LikeButton.css';

const LikeButton = ({ id, quoteData }) => {
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    const likedQuotes = JSON.parse(localStorage.getItem('likedQuotes')) || [];
    setIsLiked(likedQuotes.includes(id));
  }, [id]);

  const toggleLike = () => {
    const likedQuotes = JSON.parse(localStorage.getItem('likedQuotes')) || [];
    
    let updatedLikes;
    if (isLiked) {
      updatedLikes = likedQuotes.filter(quoteId => quoteId !== id);
    } else {
      updatedLikes = [...likedQuotes, id];
    }
    
    localStorage.setItem('likedQuotes', JSON.stringify(updatedLikes));
    
    setIsLiked(!isLiked);

    window.dispatchEvent(new CustomEvent('likedQuotesUpdated', { 
      detail: { id, isLiked: !isLiked, quoteData } 
    }));
  };

  return (
    <button 
      className={`like-button ${isLiked ? 'liked' : ''}`} 
      onClick={toggleLike}
      aria-label={isLiked ? "좋아요 취소" : "좋아요"}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle 
          cx="12" 
          cy="12" 
          r="11" 
          stroke="currentColor" 
          strokeWidth="2"
          fill={isLiked ? "#333" : "none"} 
        />
        <path 
          d="M12 7.5C12 7.5 13 5.5 15.2 5.5C17.8 5.5 19.5 7.8 19.5 10C19.5 13.4 16.5 16.2 12 20C7.5 16.2 4.5 13.4 4.5 10C4.5 7.8 6.2 5.5 8.8 5.5C11 5.5 12 7.5 12 7.5Z" 
          fill={isLiked ? "#FFEF5F" : "currentColor"} 
        />
      </svg>
    </button>
  );
};

export default LikeButton;