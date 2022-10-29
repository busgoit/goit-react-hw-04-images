import { useState, useEffect } from 'react';
import API from '../services';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalPicture, setModalPicture] = useState(null);
  const perPage = 12;

  useEffect(() => {
    if (searchQuery !== '') {
      setIsLoading(true);

      const getImagesByQuery = async searchQuery => {
        try {
          const data = await API.fetchImagesWithQuery(
            searchQuery,
            page,
            perPage
          );

          setPictures(prevState =>
            page > 1 ? [...prevState, ...data.hits] : data.hits
          );

          setTotalPages(Math.ceil(data.total / perPage));
          setIsLastPage(page === totalPages ? true : false);
        } catch (error) {
          setError(`Your pictures for ${searchQuery} were not found.`);
        } finally {
          setIsLoading(false);
        }
      };

      getImagesByQuery(searchQuery);
    }
  }, [searchQuery, page, perPage, totalPages]);

  const onFormSubmit = inputValue => {
    setPictures([]);
    setPage(1);
    setSearchQuery(inputValue);
  };

  const onLoadMoreButton = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getModalImg = picture => {
    setModalPicture(picture);
    toggleModal();
  };

  const isPictures = pictures && pictures.length > 0 && !isLoading;

  return (
    <>
      <Searchbar onFormSubmit={onFormSubmit} />
      {isLoading && <Loader />}
      {isPictures && <ImageGallery onClick={getModalImg} pictures={pictures} />}
      {isPictures && (
        <Button onLoadMoreBtnClick={onLoadMoreButton} isLastPage={isLastPage} />
      )}
      {showModal && <Modal onClose={toggleModal} picture={modalPicture} />}
    </>
  );
};
