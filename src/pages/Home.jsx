import Banner from '@/features/Banner';
import BrandBanner from '@/features/Banner/BrandBanner';
import SliderPostList from '@/features/Post/PostList/SliderPostList/SliderPostList';
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
        <SliderPostList
          heading='Tin tức mới nhất'
          params={{
            pageSize: 10,
          }}
        />
      </Box>
      <Box>
        <SliderProductList
          heading='Đang giảm giá'
          params={{
            onSale: true,
            pageSize: 10,
          }}
        />
      </Box>
      <Box>
        <GridProductList
          heading='Có thể bạn quan tâm'
          params={{
            pageSize: 20,
            SortColumn: 'ordercount',
            SortOrder: 'desc',
          }}
        />
      </Box>
    </Container>
  );
};

export default Home;
