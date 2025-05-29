import React, { useState, useEffect } from 'react';
import QuoteCard from '../components/QuoteCard';
import MovieCard from '../components/MovieCard';
import BookCard from '../components/BookCard';
import SquareCard from '../components/SquareCard';
import { quoteData } from '../data/quoteData';
import { movieData } from '../data/movieData';
import { bookData } from '../data/bookData';
import { playlistData, popularPlaylistData } from '../data/playlistData';
import '../styles/Main.css';
import '../styles/MyArchive.css';

const MyArchive = () => {

  const [likedItems, setLikedItems] = useState([]);
  const [loading, setLoading] = useState(true);


  const allData = [
    ...quoteData.map(item => ({ ...item, type: 'quote' })),
    ...movieData.map(item => ({ ...item, type: 'movie' })),
    ...bookData.map(item => ({ ...item, type: 'book' })),
    ...playlistData.map(item => ({ ...item, type: 'playlist' })),
    ...popularPlaylistData.map(item => ({ ...item, type: 'playlist' }))
  ];


  const loadLikedItems = () => {

    const likedIds = JSON.parse(localStorage.getItem('likedQuotes')) || [];
    

    const likedItemsData = allData.filter(item => likedIds.includes(item.id));
    
    setLikedItems(likedItemsData);
  };


  useEffect(() => {
    loadLikedItems();
    setLoading(false);
  }, []);


  useEffect(() => {

    const handleLikedUpdated = () => {
      loadLikedItems();
    };


    window.addEventListener('likedQuotesUpdated', handleLikedUpdated);
    window.addEventListener('storage', handleLikedUpdated);
    

    return () => {
      window.removeEventListener('likedQuotesUpdated', handleLikedUpdated);
      window.removeEventListener('storage', handleLikedUpdated);
    };
  }, []);


  const renderItem = (item) => {
    switch(item.type) {
      case 'quote':
        return (
          <QuoteCard
            key={item.id}
            id={item.id}
            name={item.name}
            birth={item.birth}
            quote={item.quote}
            images={item.images}
          />
        );
      case 'movie':
        return (
          <MovieCard
            key={item.id}
            id={item.id}
            images={item.images}
            title={item.title}
            releaseYear={item.releaseYear}
            quote={item.quote}
          />
        );
      case 'book':
        return (
          <BookCard
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            title={item.title}
            name={item.name}
            onClick={() => {}}
          />
        );
      case 'playlist':
        return (
          <SquareCard
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            title={item.title}
            name={item.name}
            onClick={() => {}}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  return (
    <div className="my-archive-container">
      <div className="keywordList">
        <div className="keyword">Liked</div>
        <div className="keywordText">WORLD OF WORD</div>
      </div>
      
      {likedItems.length === 0 ? (
        <div className="no-likes-message">
          <p>아직 아카이빙된 컨텐츠가 없습니다.</p>
          <p>마음에 드는 단어에 좋아요를 눌러보세요!</p>
        </div>
      ) : (
        <div className="liked-quotes-grid">
          {likedItems.map(item => renderItem(item))}
        </div>
      )}
    </div>
  );
};

export default MyArchive;