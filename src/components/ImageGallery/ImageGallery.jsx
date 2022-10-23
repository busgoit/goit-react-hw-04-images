import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import {
  ImageGalleryContainer,
  StyledImageGallery,
  StyledImageGalleryItem,
} from './ImageGallery.styled';

const ImageGallery = ({ pictures, onClick }) => {
  return (
    <ImageGalleryContainer>
      <StyledImageGallery>
        {pictures.map(picture => (
          <StyledImageGalleryItem key={picture.id}>
            <ImageGalleryItem picture={picture} onClick={onClick} />
          </StyledImageGalleryItem>
        ))}
      </StyledImageGallery>
    </ImageGalleryContainer>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
