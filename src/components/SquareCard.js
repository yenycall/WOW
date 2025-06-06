import React, { useState, useEffect } from 'react';
import '../styles/SquareCard.css';
import LikeButton from './LikeButton';
import { useModal } from '../context/ModalContext';

const SquareCard = ({ id, imageUrl, title, name, type = 'movie' }) => {
    const [isChecked, setIsChecked] = useState(false);
    
    const squareData = { 
        id, 
        title, 
        name, 
        imageUrl: process.env.PUBLIC_URL + imageUrl 
    };
    
    const { openModal } = useModal();
    
    useEffect(() => {
        const checkedItems = JSON.parse(localStorage.getItem('checkedCards') || '[]');
        setIsChecked(checkedItems.includes(id));
    }, [id]);
    
    const handleCardClick = (e) => {
        if (e.target.closest('.like-button')) {
            return;
        }

        if (!isChecked) {
            setIsChecked(true);
            
            const checkedItems = JSON.parse(localStorage.getItem('checkedCards') || '[]');
            if (!checkedItems.includes(id)) {
                checkedItems.push(id);
                localStorage.setItem('checkedCards', JSON.stringify(checkedItems));
            }
        }
        
        console.log('카드 클릭됨:', squareData, 'music');
        openModal(squareData, 'music');
    };
    
    return (
        <div className={`square-card-container ${isChecked ? 'checked' : ''}`}>
            <div className="square-card" onClick={handleCardClick}>
                <div className="card-image">
                    <div 
                        style={{ 
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url(${process.env.PUBLIC_URL}${imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: isChecked ? 0.5 : 1,
                            transition: 'opacity 0.3s ease'
                        }}
                    ></div>
                    
                    <div 
                        className="gradient-overlay"
                        style={{
                            opacity: isChecked ? 0.5 : 1,
                            transition: 'opacity 0.3s ease'
                        }}
                    ></div>
                    
                    <LikeButton id={id} quoteData={squareData} />
                </div>
            </div>
            <div 
                className="card-info"
                style={{
                    opacity: isChecked ? 0.6 : 1,
                    transition: 'opacity 0.3s ease'
                }}
            >
                <h3 className="card-title">{title}</h3>
                <p className="card-name">{name}</p>
            </div>
        </div>
    );
};

export default SquareCard;