import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyledSearchbar,
  SearchForm,
  SearchFormInput,
  SearchFormButton,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  onInputChange = e => {
    this.setState({ inputValue: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.inputValue.trim() === '') {
      return;
    }

    this.props.onFormSubmit(this.state.inputValue);
    this.reset();
  };

  reset = () => {
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <StyledSearchbar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormInput
            type="text"
            value={inputValue}
            onChange={this.onInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />

          <SearchFormButton type="submit">Search</SearchFormButton>
        </SearchForm>
      </StyledSearchbar>
    );
  }
}

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
