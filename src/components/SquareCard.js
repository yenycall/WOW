import React from 'react';
import '../styles/SquareCard.css';
import LikeButton from './LikeButton';
import { useModal } from '../context/ModalContext';

const SquareCard = ({ id, imageUrl, title, name }) => {

    const squareData = { 
        id, 
        title, 
        name, 
        imageUrl: process.env.PUBLIC_URL + imageUrl 
    };
    

    const { openModal } = useModal();
    

    const handleCardClick = (e) => {

        if (e.target.closest('.like-button')) {
            return;
        }
        

        openModal(squareData);
    };
    
    return (
        <div className="square-card-container">
            <div className="square-card" onClick={handleCardClick}>
                <div className="card-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}${imageUrl})` }}>
                    <div className="gradient-overlay"></div>
                    
                    {/* 좋아요 버튼 추가 */}
                    <LikeButton id={id} quoteData={squareData} />
                </div>
            </div>
            <div className="card-info">
                <h3 className="card-title">{title}</h3>
                <p className="card-name">{name}</p>
            </div>
        </div>
    );
};

export default SquareCard;