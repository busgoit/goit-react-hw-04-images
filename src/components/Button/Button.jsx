import React from 'react';
import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

const Button = ({ onLoadMoreBtnClick, isLastPage }) => {
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
  isLastPage: PropTypes.bool.isRequired,
  onLoadMoreBtnClick: PropTypes.func.isRequired,
};

export default Button;
