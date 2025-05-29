import React, { createContext, useState, useContext } from 'react';
import Modal from '../components/Modal';

const ModalContext = createContext();


export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    item: null
  });


  const openModal = (item) => {
    setModalState({
      isOpen: true,
      item
    });

    document.body.style.overflow = 'hidden';
  };


  const closeModal = () => {
    setModalState({
      isOpen: false,
      item: null
    });

    document.body.style.overflow = 'auto';
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        item={modalState.item} 
      />
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