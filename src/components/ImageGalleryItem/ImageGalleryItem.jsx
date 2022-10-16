import PropTypes from 'prop-types';
import { Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ picture, onClick }) => {
  return (
    <Image
      onClick={() => onClick(picture)}
      src={picture.webformatURL}
      alt={picture.tags}
    />
  );
};

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
