/* eslint-disable react/prop-types */
import { useGetSellingProductQuery } from '@/apis/productApi';
import { Box, Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import Product from '../Product';
import { useState } from 'react';
import SliderProductListSkeleton from '../SliderProductList/Skeleton';
const GridProductList = ({ heading, params, queryStr }) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isError } = useGetSellingProductQuery({
    params: {
      ...params,
      pageSize: params?.pageSize ? params.pageSize * page : 10 * page,
    },
    queryStr,
  });

  if (isLoading) return <SliderProductListSkeleton />;
  if (isError)
    return (
      <Box w='full'>
        <Text>Có lỗi xảy ra</Text>
      </Box>
    );
  return (
    <Box my={4}>
      <Box w='full' mb={4}>
        <Heading
          as='h6'
          fontWeight='600'
          fontSize={{
            base: '1.2rem',
            lg: '1.5rem',
          }}
        >
          {heading}
        </Heading>
      </Box>
      <SimpleGrid columns={[1, 2, 4, 5]} gap='4'>
        {data?.items.map(product => {
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
