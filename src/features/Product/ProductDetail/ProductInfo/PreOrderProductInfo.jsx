/* eslint-disable react/prop-types */
import CartIcon from '@/assets/Icon/cart';
import formatMoney from '@/utils/formatMoney';
import {
  Box,
  Button,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

const PreOrderProductInfo = ({ productData }) => {
  return (
    <VStack
      boxSize='full'
      textAlign='left'
      justifyContent='space-between'
      pb={2}
    >
      <VStack textAlign='left' gap='2' w='full' flex='1'>
        <Heading
          w='full'
          as='h2'
          fontSize={{
            base: '1.6rem',
            lg: '2rem',
          }}
          fontWeight='500'
        >
          {[productData?.name]}
        </Heading>

        <Box w='full' my={4}>
          {productData.salePrice !== 0 && (
            <Text
              as='s'
              w='full'
              color='gray.400'
              my={4}
              fontSize='1.2rem'
              fontWeight='600'
            >
              {formatMoney(productData.originalPrice)}
            </Text>
          )}
          <Text w='full' color='pink.400' fontSize={'2rem'} fontWeight='800'>
            {formatMoney(
              productData.salePrice === 0
                ? productData.originalPrice
                : productData.salePrice
            )}
          </Text>
        </Box>
      </VStack>
      <Stack flexDirection='column' w='full' gap='2' flex='2'>
        <Stack
          flexDirection={{
            base: 'row',
            lg: 'column',
          }}
          w='full'
          flex='2'
        >
          <Box w='full' mt={[0, 0, 4]}>
            <Button
              w={{
                base: 'full',
                lg: '40%',
              }}
              size={['sm', 'md', 'lg']}
              colorScheme='pink'
              leftIcon={<Icon as={CartIcon} fontWeight='800' />}
              onClick={console.log}
              isDisabled={productData.quantity === 0}
            >
              Đặt trước ngay
            </Button>
          </Box>
        </Stack>
      </Stack>
    </VStack>
  );
};

export default PreOrderProductInfo;
