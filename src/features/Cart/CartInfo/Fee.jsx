/* eslint-disable react/prop-types */
import formatMoney from '@/utils/formatMoney';
import { HStack, Text, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Fee = () => {
  const cartState = useSelector(state => state.cart);

  return (
    <VStack w='full' my={2}>
      <HStack w='full' justifyContent='space-between' mt={2}>
        <Text color='gray.500' fontSize='0.95rem'>
          Tạm tính
        </Text>
        <Text fontSize='1.15rem' fontWeight='400'>
          {formatMoney(cartState?.data?.totalPrice)}
        </Text>
      </HStack>
      <HStack w='full' justifyContent='space-between' mt={2}>
        <Text color='gray.700' fontSize='0.95rem' fontWeight='600'>
          Tổng tiền
        </Text>
        <Text fontSize='1.5rem' color='pink.400'>
          {formatMoney(cartState?.data?.totalPrice)}
        </Text>
      </HStack>
    </VStack>
  );
};

export default Fee;
