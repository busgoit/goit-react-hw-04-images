import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindowContent, Img } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, picture }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindowContent>
        <Img src={picture.largeImageURL} alt={picture.tags} />
      </ModalWindowContent>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  picture: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default Modal;
