import React from 'react';
import '../../styles/ModalStyles/MusicModal.css';
import '../../styles/Modal.css';
import { MusicModalData } from '../../data/playlistData';

const MusicModal = ({ isOpen, onClose, item }) => {
    if (!isOpen) return null;

    const data = MusicModalData.find(music => music.id === item?.id) || MusicModalData[0];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content music-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                
                <div className="modal-scroll-container">
                    <div className="music-info">
                        <div className="music-sec1">
                            <p className="music-title">{data.title}</p>
                            <p className="music-artist">{data.artist}</p>
                        </div>

                        <div className="music-sec2">
                            <p className="music-album">{data.album}</p>
                            <p>&nbsp;/&nbsp;</p>
                            <p className="music-year">{data.year}</p>
                        </div>

                        <p className="music-summary">{data.summary}</p>
                        <p className="music-lyric">{data.lyric}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicModal;