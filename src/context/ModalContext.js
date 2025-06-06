import React, { createContext, useState, useContext } from 'react';
import MovieModal from '../components/Modals/MovieModal';
import QuoteModal from '../components/Modals/QuoteModal';
import BookModal from '../components/Modals/BookModal';
import MusicModal from '../components/Modals/MusicModal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    item: null,
    type: null
  });

  const openModal = (item, type) => {
    setModalState({
      isOpen: true,
      item,
      type
    });
    
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      item: null,
      type: null
    });

    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  const renderModal = () => {
    if (!modalState.isOpen || !modalState.item) return null;

    const commonProps = {
      isOpen: modalState.isOpen,
      onClose: closeModal,
      item: modalState.item
    };

    console.log('Rendering modal type:', modalState.type); // 디버깅용

    switch (modalState.type) {
      case 'movie':
        return <MovieModal {...commonProps} />;
      case 'quote':
        return <QuoteModal {...commonProps} />;
      case 'book':
        return <BookModal {...commonProps} />;
      case 'music':
        return <MusicModal {...commonProps} />;
      default:
        console.warn('Unknown modal type:', modalState.type);
        return <MovieModal {...commonProps} />; 
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {renderModal()}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};