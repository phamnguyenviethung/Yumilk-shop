import { useGetSellingProductQuery } from '@/apis/productApi';
import Banner from '@/features/Banner';
import GridProductList from '@/features/Product/ProductList/GridProductList';
import { Box, Center, Container } from '@chakra-ui/react';
const Home = () => {
  const { data = { items: [] }, isLoading } = useGetSellingProductQuery();

  if (isLoading) return <p>loading..........!</p>;

  return (
    <Container maxW='container.xl'>
      <Center mb={4} pb={8}>
        <Banner />
      </Center>
      <Box>
        <GridProductList data={data} />
      </Box>
    </Container>
  );
};

export default Home;
