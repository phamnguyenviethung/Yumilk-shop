import GridProductList from '@/features/Product/ProductList/GridProductList';
import { Box, Container, Text } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchPararm] = useSearchParams();
  return (
    <Container maxW='container.xl'>
      <Box textAlign='center' w='full' mb={4} fontSize='1.2rem'>
        <Text>
          Kết quả tìm kiếm <b>{searchPararm.get('keyword') || ''}</b>
        </Text>
      </Box>
      <GridProductList
        params={{
          pageSize: 30,
          searchTerm: searchPararm.get('keyword') || '',
        }}
      />
    </Container>
  );
};

export default Search;
