import { useGetProductDetailQuery } from '@/apis/productApi';
import ProductImages from '@/features/Product/ProductDetail/ProcutImages';
import ProductInfo from '@/features/Product/ProductDetail/ProductInfo';
import TabInfo from '@/features/Product/ProductDetail/TabInfo';
import { Box, Container, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductDetailQuery(id);
  if (isLoading) return <p>ss</p>;
  return (
    <Container maxW='container.xl' boxSize='full'>
      <Stack
        flexDirection={{
          base: 'column',
          lg: 'row',
        }}
        gap={{
          base: 6,
          lg: 10,
        }}
        mb={16}
        pt={2}
        pb={4}
        minH='200px'
      >
        <Box flex='2' px={2}>
          <ProductImages id={id} />
        </Box>
        <Box flex='3' minH='full'>
          <ProductInfo productData={data} />
        </Box>
      </Stack>
      <Box>
        <TabInfo productID={id} />
      </Box>
    </Container>
  );
};

export default ProductDetail;
