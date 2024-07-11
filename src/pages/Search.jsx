import GridProductList from '@/features/Product/ProductList/GridProductList';
import Filter from '@/features/Search/Filter';
import Sort from '@/features/Search/Sort';
import { Box, Container, Flex, Text } from '@chakra-ui/react';
import queryString from 'query-string';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
const Search = () => {
  const [searchPararm] = useSearchParams();
  const [queryStr, setQueryStr] = useState({});

  return (
    <Container maxW='container.xl'>
      <Box textAlign='center' w='full' mb={4} fontSize='1.2rem'>
        <Text>
          Kết quả tìm kiếm <b>{searchPararm.get('keyword') || ''}</b>
        </Text>
      </Box>
      <Flex mt={16} mb={2} justifyContent='space-between'>
        <Filter setQueryStr={setQueryStr} />
        <Sort setQueryStr={setQueryStr} />
      </Flex>
      <GridProductList
        queryStr={queryString.stringify(queryStr)}
        params={{
          pageSize: 30,
          searchTerm: searchPararm.get('keyword') || '',
          statusIds: 1,
        }}
      />
    </Container>
  );
};

export default Search;
