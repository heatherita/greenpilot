import { useState } from "react";

export const useModalManager = () => {
  const [currentModal, setCurrentModal] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const openModal = (modalName) => setCurrentModal(modalName);
  const closeModal = () => setCurrentModal(null);

  const toggleModal = (modalName) => {
    if (currentModal === modalName) {
      closeModal();
    } else {
      openModal(modalName);
    }
  };

  return { openModal, closeModal, toggleModal, currentModal, isOpen, setIsOpen };
};
