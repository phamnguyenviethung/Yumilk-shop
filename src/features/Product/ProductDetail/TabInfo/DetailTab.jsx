import { Box } from '@chakra-ui/react';
import './style.css';
// eslint-disable-next-line react/prop-types
const DetailTab = ({ description }) => {
  return (
    <Box className='yumilk-product-description'>
      <div dangerouslySetInnerHTML={{ __html: description }}></div>
    </Box>
  );
};

export default DetailTab;
