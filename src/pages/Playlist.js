import React from 'react';
import '../styles/Main.css';
import SquareCard from '../components/SquareCard';
import { playlistData, popularPlaylistData } from '../data/playlistData';

const Playlist = () => {
    return (
        <div className="main-container">
            <div className="keywordList">
                <div className="keyword">Keyword</div>
                <div className="keywordText">LOVE</div>
            </div>

            <div className="cards-grid">
                {playlistData.map(playlist => (
                    <SquareCard
                        key={playlist.id}
                        id={playlist.id} 
                        imageUrl={playlist.imageUrl}
                        title={playlist.title}
                        name={playlist.name}
                        onClick={() => console.log(`플레이리스트 ${playlist.id} 선택됨`)}
                    />
                ))}
            </div>

            <div className="keywordList">
                <div className="keyword">Keyword</div>
                <div className="keywordText">SUMMER</div>
            </div>

            <div className="cards-grid">
                {popularPlaylistData.map(popularPlaylist => (
                    <SquareCard
                        key={popularPlaylist.id}
                        id={popularPlaylist.id} 
                        imageUrl={popularPlaylist.imageUrl}
                        title={popularPlaylist.title}
                        name={popularPlaylist.name}
                        onClick={() => console.log(`플레이리스트 ${popularPlaylist.id} 선택됨`)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Playlist;