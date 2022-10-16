import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import {
  StyledImageGallery,
  StyledImageGalleryItem,
} from './ImageGallery.styled';

const ImageGallery = ({ pictures, onClick }) => {
  return (
    <StyledImageGallery>
      {pictures.map(picture => (
        <StyledImageGalleryItem key={picture.id}>
          <ImageGalleryItem picture={picture} onClick={onClick} />
        </StyledImageGalleryItem>
      ))}
    </StyledImageGallery>
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
