import React from 'react';
import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

const Button = props => {
  return (
    <LoadMoreButton onClick={props.onLoadMoreBtnClick} type="button">
      Load more
    </LoadMoreButton>
  );
};

Button.propTypes = {
  onLoadMoreBtnClick: PropTypes.func.isRequired,
};

export default Button;
