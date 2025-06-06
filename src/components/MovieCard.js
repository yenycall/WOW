import React, { useState, useEffect } from 'react';
import '../styles/MovieCard.css';
import LikeButton from './LikeButton';
import { useModal } from '../context/ModalContext';

const MovieCard = ({ id, images, title, releaseYear, quote }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  const { openModal } = useModal();

  const movieData = {
    id,
    title,
    releaseYear,
    quote,
    images: images.map(img => process.env.PUBLIC_URL + img)
  };

  useEffect(() => {
    const checkedItems = JSON.parse(localStorage.getItem('checkedMovieCards') || '[]');
    setIsChecked(checkedItems.includes(id));
  }, [id]);

  const handleCardClick = (e) => {
    if (e.target.closest('.like-button') || e.target.closest('.dot')) {
      return;
    }

    if (!isChecked) {
      setIsChecked(true);
      
      const checkedItems = JSON.parse(localStorage.getItem('checkedMovieCards') || '[]');
      if (!checkedItems.includes(id)) {
        checkedItems.push(id);
        localStorage.setItem('checkedMovieCards', JSON.stringify(checkedItems));
      }
    }

    openModal(movieData);
  };

  return (
    <div className={`movie-card-container ${isChecked ? 'checked' : ''}`}>
      <div className="movie-card" onClick={handleCardClick}>
        <img
          src={`${process.env.PUBLIC_URL}${images[currentImageIndex]}`}
          alt={`${title} 이미지 ${currentImageIndex + 1}`}
          className="movie-image"
          style={{
            opacity: isChecked ? 0.5 : 1,
            transition: 'opacity 0.3s ease'
          }}
        />

        <LikeButton id={id} quoteData={movieData} />

        <div 
          className="gradient-overlay"
          style={{
            opacity: isChecked ? 0.5 : 1,
            transition: 'opacity 0.3s ease'
          }}
        ></div>

        {quote && (
          <div 
            className="movie-quote"
            style={{
              opacity: isChecked ? 0.6 : 1,
              transition: 'opacity 0.3s ease'
            }}
          >
            <p>"{quote}"</p>
          </div>
        )}

        <div className="slider-dots" onClick={(e) => e.stopPropagation()}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`dot ${index === currentImageIndex ? 'active' : ''}`}
              aria-label={`이미지 ${index + 1} 보기`}
              style={{
                opacity: isChecked ? 0.6 : 1,
                transition: 'opacity 0.3s ease'
              }}
            ></button>
          ))}
        </div>
      </div>

      <div 
        className="movie-info"
        style={{
          opacity: isChecked ? 0.6 : 1,
          transition: 'opacity 0.3s ease'
        }}
      >
        <h3 className="movie-title">{title}</h3>
        <p className="movie-year">{releaseYear}</p>
      </div>
    </div>
  );
};

export default MovieCard;