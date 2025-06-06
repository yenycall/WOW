import React from 'react';
import '../../styles/ModalStyles/MovieModal.css';
import '../../styles/Modal.css';
import { MovieModalData } from '../../data/movieData';

const MovieModal = ({ isOpen, onClose, item }) => {
    if (!isOpen) return null;

    const data = MovieModalData.find(movie => movie.id === item?.id) || MovieModalData[0];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content movie-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                
                <div className="modal-scroll-container">
                    <div className="movie-info">
                        <div className="movie-sec">
                            <p className="movie-title">{data.title}</p>
                            <p className="movie-year">{data.year}</p>
                            <p className="movie-director">Directed by {data.director}</p>
                            <p className="movie-actor">{data.actor}</p>
                        </div>

                        <p className="movie-line">{data.line}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;