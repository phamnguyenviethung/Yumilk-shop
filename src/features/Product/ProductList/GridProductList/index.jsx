/* eslint-disable react/prop-types */
import { useGetSellingProductQuery } from '@/apis/productApi';
import { Box, Heading, SimpleGrid, Skeleton } from '@chakra-ui/react';
import Product from '../Product';
const GridProductList = ({ heading, params }) => {
  const { data, isLoading } = useGetSellingProductQuery(params);

  if (isLoading) return <Skeleton />;
  return (
    <Box my={4}>
      <Box w='full' mb={8}>
        <Heading as='h6' fontWeight='600' fontSize='1.25rem'>
          {heading}
        </Heading>
      </Box>
      <SimpleGrid columns={[1, 2, 4, 5]} gap='4'>
        {data.items.map(product => {
          return <Product key={product.id} data={product} />;
        })}
      </SimpleGrid>
    </Box>
  );
};

export default GridProductList;
