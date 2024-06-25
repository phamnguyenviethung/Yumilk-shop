import Banner from '@/features/Banner';
import BrandBanner from '@/features/Banner/BrandBanner';
import GridProductList from '@/features/Product/ProductList/GridProductList';
import SliderProductList from '@/features/Product/ProductList/SliderProductList';
import { Box, Center, Container } from '@chakra-ui/react';
const Home = () => {
  return (
    <Container maxW='container.xl'>
      <Center mb={4} pb={8}>
        <Banner />
      </Center>
      <Center mb={4} pb={8}>
        <BrandBanner />
      </Center>
      <Box>
        <SliderProductList
          heading='Đang giảm giá'
          params={{
            onSale: true,
            pageSize: 20,
          }}
        />
      </Box>
      <Box>
        <GridProductList
          heading='Có thể bạn quan tâm'
          params={{
            pageSize: 20,
          }}
        />
      </Box>
    </Container>
  );
};

export default Home;
