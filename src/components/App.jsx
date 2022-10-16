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
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    modalPicture: null,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    const prevQuery = prevState.searchQuery;
    const prevPage = prevState.page;
    const prevPictures = prevState.pictures;
    const isPrevQuery = prevQuery !== searchQuery;

    if (isPrevQuery || prevPage !== page) {
      this.setState({ isLoading: true });

      try {
        const pictures = await API.fetchImagesWithQuery(searchQuery, page);
        this.setState({
          pictures: isPrevQuery
            ? [...pictures]
            : [...prevPictures, ...pictures],
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
    const { pictures, isLoading, showModal, modalPicture } = this.state;
    const isPictures = pictures && pictures.length > 0 && !isLoading;

    return (
      <>
        <Searchbar onFormSubmit={this.onFormSubmit} />
        {isLoading && <Loader />}
        {isPictures && (
          <ImageGallery onClick={this.getModalImg} pictures={pictures} />
        )}
        {isPictures && <Button onLoadMoreBtnClick={this.onLoadMoreButton} />}
        {showModal && (
          <Modal onClose={this.toggleModal} picture={modalPicture} />
        )}
      </>
    );
  }
}
