import { useGetProductDetailQuery } from '@/apis/productApi';
import Loading from '@/components/Loading';
import product from '@/constants/product';
import ProductImages from '@/features/Product/ProductDetail/ProcutImages';
import ProductInfo from '@/features/Product/ProductDetail/ProductInfo';
import TabInfo from '@/features/Product/ProductDetail/TabInfo';
import { Box, Center, Container, Stack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetail = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductDetailQuery(id);

  if (!isLoading && data.statusId === product.PRE_ORDER_STATUS) {
    nav(`/preorder/${id}`);
  }

  if (isLoading) {
    return (
      <Center boxSize='full'>
        <Loading />
      </Center>
    );
  }

  if (isError)
    return (
      <Center w='full' h='500px'>
        Không tìm thấy dữ liệu
      </Center>
    );

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
        minH='500px'
      >
        {isLoading ? (
          <Center boxSize='full'>
            {' '}
            <Loading />
          </Center>
        ) : (
          <>
            <Box flex='2' px={2}>
              <ProductImages id={id} />
            </Box>
            <Box flex='3' minH='full'>
              <ProductInfo productData={data} />
            </Box>
          </>
        )}
      </Stack>
      <Box>
        <TabInfo productID={id} />
      </Box>
    </Container>
  );
};

export default ProductDetail;
