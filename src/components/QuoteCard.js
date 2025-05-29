import React, { useState } from 'react';
import '../styles/QuoteCard.css';
import LikeButton from './LikeButton';
import { useModal } from '../context/ModalContext';

const QuoteCard = ({ id, images, name, birth, quote }) => {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    
    const { openModal } = useModal();
    
    const displayImage = images && images.length > 0 ? images[0] : null;

    const quoteData = { 
        id, 
        name, 
        birth, 
        quote,
        images: images ? images.map(img => process.env.PUBLIC_URL + img) : []
    };

    const handleCardClick = (e) => {

        if (e.target.closest('.like-button') || e.target.closest('.dot')) {
            return;
        }

        openModal(quoteData);
    };

    return (
        <div className="quote-card-container">
            <div className="quote-card" onClick={handleCardClick}>
                {displayImage && (
                    <img
                        src={`${process.env.PUBLIC_URL}${displayImage}`}
                        alt={`${name} 이미지`}
                        className="quote-image"
                    />
                )}

                <LikeButton id={id} quoteData={quoteData} />

                <div className="gradient-overlay0"></div>

                {quote && Array.isArray(quote) && quote.length > 0 && (
                    <div className="quote-quote">
                        <p>{quote[currentQuoteIndex]}</p>
                    </div>
                )}

                {quote && Array.isArray(quote) && quote.length > 1 && (
                    <div className="slider-dots" onClick={(e) => e.stopPropagation()}>
                        {quote.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentQuoteIndex(index)}
                                className={`dot ${index === currentQuoteIndex ? 'active' : ''}`}
                                aria-label={`명언 ${index + 1} 보기`}
                            ></button>
                        ))}
                    </div>
                )}
            </div>

            <div className="quote-info">
                <h3 className="quote-name">{name}</h3>
                <p className="quote-birth">{birth}</p>
            </div>
        </div>
    );
};

export default QuoteCard;