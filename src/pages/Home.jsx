import BrandBanner from '@/features/Banner/BrandBanner';
import SliderPostList from '@/features/Post/PostList/SliderPostList/SliderPostList';
import GridProductList from '@/features/Product/ProductList/GridProductList';
import SliderProductList from '@/features/Product/ProductList/SliderProductList';
import VoucherList from '@/features/Widgets/VoucherList';
import { Box, Center, Container } from '@chakra-ui/react';
const Home = () => {
  return (
    <Container maxW='container.xl'>
      <VoucherList />
      <Box>
        <SliderProductList
          heading='Đặt trước'
          params={{
            pageSize: 10,
            statusIds: [2],
          }}
        />
      </Box>
      <Center mb={4} pb={8}>
        <BrandBanner />
      </Center>

      <Box>
        <SliderProductList
          heading='Đang giảm giá'
          params={{
            onSale: true,
            pageSize: 10,
            statusIds: [1],
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
            statusIds: [1],
          }}
        />
      </Box>
      <Box>
        <SliderPostList
          heading='Bạn nên đọc'
          params={{
            pageSize: 10,
          }}
        />
      </Box>
    </Container>
  );
};

export default Home;
