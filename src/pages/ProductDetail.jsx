import { Box, Container, HStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  return (
    <Container maxW='container.xl' boxSize='full'>
      <HStack>
        <Box>images</Box>
        <Box>basic info</Box>
      </HStack>
      <Box>tab info</Box>
    </Container>
  );
};

export default ProductDetail;
