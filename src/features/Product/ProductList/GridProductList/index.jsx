/* eslint-disable react/prop-types */
import { useGetSellingProductQuery } from '@/apis/productApi';
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
} from '@chakra-ui/react';
import Product from '../Product';
import { useState } from 'react';
const GridProductList = ({ heading, params }) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useGetSellingProductQuery({
    ...params,
    pageSize: params.pageSize * page,
  });

  if (isLoading) return <Skeleton />;
  return (
    <Box my={4}>
      <Box w='full' mb={4}>
        <Heading as='h6' fontWeight='600' fontSize='1.25rem'>
          {heading}
        </Heading>
      </Box>
      <SimpleGrid columns={[1, 2, 4, 5]} gap='4'>
        {data.items.map(product => {
          return <Product key={product.id} data={product} />;
        })}
      </SimpleGrid>
      <Flex justifyContent='center' w='full' mt={8} mb={2}>
        <Button
          onClick={() => setPage(page + 1)}
          colorScheme='pink'
          variant='outline'
          isLoading={isFetching}
          display={!data.hasNextPage ? 'none' : 'block'}
        >
          Xem thêm
        </Button>
      </Flex>
    </Box>
  );
};

export default GridProductList;
