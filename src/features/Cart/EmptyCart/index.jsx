import { Box, Center, Heading, Image, Text } from '@chakra-ui/react';
import emptycart from '@/assets/emptycart.png';
import SliderProductList from '@/features/Product/ProductList/SliderProductList';
const EmptyCart = () => {
  return (
    <Box w='full'>
      <Center flexDirection='column' w='full' minH='400px'>
        <Box
          boxSize={{
            base: 250,
            lg: 300,
          }}
          mb={2}
        >
          <Image boxSize='full' src={emptycart} />
        </Box>
        <Heading
          my={2}
          w='full'
          as='h6'
          textAlign='center'
          fontSize='1.5rem'
          fontWeight='500'
        >
          Giỏ hàng trống
        </Heading>
        <Text>Bạn có thể tham khảo các sản phẩm ở phía dưới</Text>
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
    </Box>
  );
};

export default EmptyCart;
