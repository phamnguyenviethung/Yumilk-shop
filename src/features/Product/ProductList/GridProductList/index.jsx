/* eslint-disable react/prop-types */
import { useGetSellingProductQuery } from '@/apis/productApi';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import Product from '../Product';
import { useState } from 'react';
import SliderProductListSkeleton from '../SliderProductList/Skeleton';
const GridProductList = ({ heading, params, queryStr }) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isError } = useGetSellingProductQuery({
    params: {
      ...params,
      pageSize: params?.pageSize ? params.pageSize * page : 10 * page,
      isActive: true,
    },
    queryStr,
  });

  if (isLoading || isFetching) return <SliderProductListSkeleton />;
  if (isError)
    return (
      <Center boxSize='full' minH='200px'>
        <Text fontWeight='600'>Có lỗi xảy ra</Text>
      </Center>
    );

  if (data?.items?.length === 0) {
    return (
      <Center boxSize='full' minH='200px'>
        <Text fontWeight='600'>Không tìm thấy sản phẩm nào phù hợp</Text>
      </Center>
    );
  }
  return (
    <Box my={8}>
      <Box w='full' mb={4}>
        <Heading
          as='h6'
          color='black.500'
          fontWeight='400'
          fontFamily="'Paytone One', sans-serif"
          fontSize={{
            base: '1.4rem',
            lg: '1.6rem',
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
