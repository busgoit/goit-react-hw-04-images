import { Oval } from 'react-loader-spinner';
import { StyledLoader } from './Loader.styled';

const Loader = () => {
  return (
    <StyledLoader>
      <Oval
        height={200}
        width={200}
        color="#3f51b5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#3f51b5"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </StyledLoader>
  );
};

export default Loader;
