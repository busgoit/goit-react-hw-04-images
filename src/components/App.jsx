import React, { Component } from 'react';
import API from '../services';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';

export class App extends Component {
  state = {
    pictures: [],
    page: 1,
    perPage: 12,
    totalPages: null,
    isLastPage: false,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    modalPicture: null,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page, perPage } = this.state;

    const prevQuery = prevState.searchQuery;
    const prevPage = prevState.page;
    const prevPictures = prevState.pictures;
    const isPrevQuery = prevQuery !== searchQuery;

    if (isPrevQuery || prevPage !== page) {
      this.setState({ isLoading: true });

      try {
        const data = await API.fetchImagesWithQuery(searchQuery, page, perPage);
        const pictures = data.hits;
        const totalPages = Math.ceil(data.total / perPage);
        const isLastPage = page === totalPages ? true : false;

        this.setState({
          pictures: isPrevQuery
            ? [...pictures]
            : [...prevPictures, ...pictures],
          totalPages,
          isLastPage,
        });
      } catch (error) {
        this.setState({
          error: `Your pictures for ${searchQuery} were not found.`,
        });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onFormSubmit = inputValue => {
    this.setState({
      pictures: [],
      page: 1,
      searchQuery: inputValue,
    });
  };

  onLoadMoreButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  getModalImg = picture => {
    this.setState({ modalPicture: picture });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { pictures, isLoading, showModal, modalPicture, isLastPage } =
      this.state;
    const isPictures = pictures && pictures.length > 0 && !isLoading;

    return (
      <>
        <Searchbar onFormSubmit={this.onFormSubmit} />
        {isLoading && <Loader />}
        {isPictures && (
          <ImageGallery onClick={this.getModalImg} pictures={pictures} />
        )}
        {isPictures && (
          <Button
            onLoadMoreBtnClick={this.onLoadMoreButton}
            isLastPage={isLastPage}
          />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal} picture={modalPicture} />
        )}
      </>
    );
  }
}
