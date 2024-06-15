/* eslint-disable react/prop-types */
import { useGetShippingFeeQuery } from '@/apis/orderApi';
import formatMoney from '@/utils/formatMoney';
import { HStack, Text, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Fee = ({ shippingFee, cartState }) => {
  return (
    <VStack w='full' my={2}>
      <HStack w='full' justifyContent='space-between'>
        <Text color='gray.500' fontSize='0.95rem'>
          Phí vận chuyển
        </Text>
        <Text fontSize='1.15rem' fontWeight='400'>
          {formatMoney(shippingFee.total)}
        </Text>
      </HStack>
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
          {formatMoney(cartState?.data?.totalPrice + shippingFee.total)}
        </Text>
      </HStack>
    </VStack>
  );
};

export default Fee;
