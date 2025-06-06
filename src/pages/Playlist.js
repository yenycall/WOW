import React from 'react';
import '../styles/Main.css';
import SquareCard from '../components/SquareCard';
import { playlistData, popularPlaylistData } from '../data/playlistData';

const Playlist = () => {
    return (
        <div className="main-container">
            <div className="keywordList">
                <div className="keyword">Keyword</div>
                <div className="keywordText">Love</div>
            </div>

            <div className="cards-grid">
                {playlistData.map(playlist => (
                    <SquareCard
                        key={playlist.id}
                        id={playlist.id} 
                        imageUrl={playlist.imageUrl}
                        title={playlist.title}
                        name={playlist.name}
                        type="music"
                    />
                ))}
            </div>

            <div className="keywordList">
                <div className="keyword">Keyword</div>
                <div className="keywordText">Summer</div>
            </div>

            <div className="cards-grid">
                {popularPlaylistData.map(popularPlaylist => (
                    <SquareCard
                        key={popularPlaylist.id}
                        id={popularPlaylist.id} 
                        imageUrl={popularPlaylist.imageUrl}
                        title={popularPlaylist.title}
                        name={popularPlaylist.name}
                        type="music"
                    />
                ))}
            </div>
        </div>
    );
};

export default Playlist;