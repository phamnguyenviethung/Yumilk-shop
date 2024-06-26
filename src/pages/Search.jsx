import GridProductList from '@/features/Product/ProductList/GridProductList';
import { Container } from '@chakra-ui/react';

const Search = () => {
  return (
    <Container maxW='container.xl'>
      <GridProductList
        params={{
          pageSize: 30,
        }}
      />
    </Container>
  );
};

export default Search;
