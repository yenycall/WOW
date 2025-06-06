import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import QuoteCard from '../components/QuoteCard';
import MovieCard from '../components/MovieCard';
import BookCard from '../components/BookCard';
import SquareCard from '../components/SquareCard';
import { quoteData } from '../data/quoteData';
import { movieData, MovieModalData } from '../data/movieData';
import { bookData } from '../data/bookData';
import { playlistData, popularPlaylistData } from '../data/playlistData';
import '../styles/Main.css';
import '../styles/MyArchive.css';

const MyArchive = () => {
  const [likedItems, setLikedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  const allData = [
    ...quoteData.map(item => ({ ...item, type: 'quote' })),
    ...movieData.map(item => {
      const modalData = MovieModalData.find(modal => modal.id === item.id);
      return { 
        ...item, 
        ...modalData, 
        type: 'movie' 
      };
    }),
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

  const closeModal = () => {
    setIsEmailModalOpen(false);
    setEmailInput('');
    setNameInput('');
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const formatContentForEmail = () => {
    let emailContent = `총 ${likedItems.length}개의 컨텐츠가 있습니다.\n\n`;
    emailContent += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    likedItems.forEach((item, index) => {
      emailContent += `${index + 1}. `;
      
      switch(item.type) {
        case 'quote':
          emailContent += `[명언] ${item.name} (${item.birth})\n`;
          if (item.quote && Array.isArray(item.quote)) {
            emailContent += `   ${item.quote[0]}\n`;
          }
          break;
        case 'movie':
          emailContent += `[영화] ${item.title} (${item.releaseYear})\n`;
          if (item.director) {  
            emailContent += `   감독: ${item.director}\n`;
          }
          break;
        case 'book':
          emailContent += `[도서] ${item.title}\n`;
          emailContent += `   저자: ${item.name}\n`;
          break;
        case 'playlist':
          emailContent += `[노래] ${item.title}\n`;
          emailContent += `   아티스트: ${item.name}\n`;
          break;
        default:
          emailContent += `${item.title}\n`;
      }
      emailContent += `\n`;
    });

    emailContent += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    emailContent += `World Of Word에서 제공된 목록입니다.`;

    return emailContent;
  };

  const sendEmail = async () => {
    if (!emailInput.trim()) {
      alert('이메일 주소를 입력해주세요.');
      return;
    }

    if (!nameInput.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (likedItems.length === 0) {
      alert('아카이브된 컨텐츠가 없습니다.');
      return;
    }

    setEmailSending(true);

    try {
      const templateParams = {
        to_email: emailInput,
        user_name: nameInput,
        content_count: likedItems.length,
        archive_content: formatContentForEmail(),
        current_date: new Date().toLocaleDateString('ko-KR')
      };

      const result = await emailjs.send(
        'archive_wow',    
        'archive_wow',     
        templateParams,
        '2ci2afRgN8F_MpF3O'      
      );

      console.log('이메일 전송 성공:', result);
      alert('아카이브 목록이 이메일로 전송되었습니다!');
      closeModal();
    } catch (error) {
      console.error('이메일 전송 실패:', error);
      alert('이메일 전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setEmailSending(false);
    }
  };

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
            director={item.director}
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
        <div className="keywordText">World Of Word</div>
        
        {likedItems.length > 0 && (
          <button 
            className="email-send-button"
            onClick={() => setIsEmailModalOpen(true)}
          >
            Send Email ✉️
          </button>
        )}
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

      {isEmailModalOpen && (
        <div className="email-modal-overlay" onClick={handleOverlayClick}>
          <div className="email-modal">
            <p className="email-modal-title">
              Send Archive List
            </p>
            <p className="email-modal-description">
              아카이브 목록 이메일 전송 <br></br>
              총 {likedItems.length}개의 컨텐츠를 이메일로 보내드립니다.
            </p>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="email-input"
            />
            <input
              type="email"
              placeholder="이메일 주소를 입력하세요"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="email-input"
            />
            <div className="email-modal-buttons">
              <button
                onClick={closeModal}
                className="email-cancel-button"
                disabled={emailSending}
              >
                취소
              </button>
              <button
                onClick={sendEmail}
                disabled={emailSending}
                className={`email-submit-button ${emailSending ? 'sending' : ''}`}
              >
                {emailSending ? '전송 중...' : '전송'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArchive;