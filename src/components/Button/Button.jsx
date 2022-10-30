import React from 'react';
import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

const Button = ({ onLoadMoreBtnClick, page, totalPages }) => {
  const isLastPage = page === totalPages;

  return (
    <LoadMoreButton
      onClick={onLoadMoreBtnClick}
      disabled={isLastPage}
      type="button"
    >
      {isLastPage ? 'No more images' : 'Load more'}
    </LoadMoreButton>
  );
};

Button.propTypes = {
  page: PropTypes.bool.isRequired,
  totalPages: PropTypes.bool.isRequired,
  onLoadMoreBtnClick: PropTypes.func.isRequired,
};

export default Button;
