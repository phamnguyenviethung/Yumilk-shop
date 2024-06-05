import { Box, SimpleGrid } from '@chakra-ui/react';

const GridProductList = () => {
  return (
    <SimpleGrid columns={[2, 2, 3]} spacing={10}>
      <Box bg='tomato' minH='500px'></Box>
      <Box bg='tomato' minH='500px'></Box>
      <Box bg='tomato' minH='500px'></Box>
      <Box bg='tomato' minH='500px'></Box>
      <Box bg='tomato' minH='500px'></Box>
    </SimpleGrid>
  );
};

export default GridProductList;
