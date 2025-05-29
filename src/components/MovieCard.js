import React, { useState } from 'react';
import '../styles/MovieCard.css';
import LikeButton from './LikeButton';
import { useModal } from '../context/ModalContext';

const MovieCard = ({ id, images, title, releaseYear, quote }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const { openModal } = useModal();


  const movieData = {
    id,
    title,
    releaseYear,
    quote,
    images: images.map(img => process.env.PUBLIC_URL + img)
  };

  const handleCardClick = (e) => {
    if (e.target.closest('.like-button') || e.target.closest('.dot')) {
      return;
    }

    openModal(movieData);
  };

  return (
    <div className="movie-card-container">
      <div className="movie-card" onClick={handleCardClick}>
        <img
          src={`${process.env.PUBLIC_URL}${images[currentImageIndex]}`}
          alt={`${title} 이미지 ${currentImageIndex + 1}`}
          className="movie-image"
        />

        <LikeButton id={id} quoteData={movieData} />

        <div className="gradient-overlay"></div>

        {quote && (
          <div className="movie-quote">
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
            ></button>
          ))}
        </div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-year">{releaseYear}</p>
      </div>
    </div>
  );
};

export default MovieCard;