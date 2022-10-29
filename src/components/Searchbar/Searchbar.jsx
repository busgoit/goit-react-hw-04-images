import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyledSearchbar,
  SearchForm,
  SearchFormInput,
  SearchFormButton,
} from './Searchbar.styled';

export const Searchbar = ({ onFormSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const onInputChange = e => {
    setInputValue(e.target.value.toLowerCase());
  };

  const reset = () => {
    setInputValue('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      return;
    }

    onFormSubmit(inputValue);
    reset();
  };

  return (
    <StyledSearchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormInput
          type="text"
          value={inputValue}
          onChange={onInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />

        <SearchFormButton type="submit">Search</SearchFormButton>
      </SearchForm>
    </StyledSearchbar>
  );
};

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
