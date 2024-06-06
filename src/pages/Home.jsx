import { useGetSellingProductQuery } from '@/apis/productApi';
import GridProductList from '@/features/Product/ProductList/GridProductList';
import { Box, Container } from '@chakra-ui/react';
const Home = () => {
  const { data = { items: [] }, isLoading } = useGetSellingProductQuery();

  if (isLoading) return <p>loading..........!</p>;

  return (
    <Container maxW='container.xl'>
      <Box>
        <GridProductList data={data} />
      </Box>
    </Container>
  );
};

export default Home;
