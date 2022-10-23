import styled from '@emotion/styled';

export const ImageGalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
`;

export const StyledImageGallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 16px;
  margin: 0px auto;
  padding: 0px;
  list-style: none;
`;

export const StyledImageGalleryItem = styled.li`
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;
