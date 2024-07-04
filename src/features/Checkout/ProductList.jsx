import formatMoney from '@/utils/formatMoney';
import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const ProductList = () => {
  const cartState = useSelector(state => state.cart);

  return (
    <VStack w='full' gap='4'>
      {cartState?.data?.cartItems?.items.map(product => {
        return (
          <Flex key={product.productId} w='full' gap='4'>
            <Box
              boxSize={{
                base: '80px',
                lg: '100px',
              }}
            >
              <Image
                boxSize='full'
                src={product.thumbnail}
                fallbackSrc='https://placehold.co/100'
                borderRadius='4px'
              />
            </Box>
            <Box w='full' alignSelf='center' flex='2'>
              <Text
                fontSize={{
                  base: '1rem',
                  lg: '1.2rem',
                }}
              >
                {product.productName}
              </Text>
              <Text my={2} fontSize='0.9rem' color='gray.500'>
                Số lượng: {product.quantity}
              </Text>
            </Box>
            <Flex alignItems='center' flex='1' justifyContent='center'>
              <Text fontSize='1.15rem'>
                {formatMoney(
                  product.salePrice === 0
                    ? product.originalPrice
                    : product.salePrice
                )}
              </Text>
            </Flex>
          </Flex>
        );
      })}
    </VStack>
  );
};

export default ProductList;
