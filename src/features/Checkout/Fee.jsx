/* eslint-disable react/prop-types */
import formatMoney from '@/utils/formatMoney';
import { Divider, HStack, Text, VStack } from '@chakra-ui/react';

const DetailText = ({ money, name, prefix, color }) => {
  return (
    <HStack w='full' justifyContent='space-between' mt={2}>
      <Text color='gray.500' fontSize='0.95rem'>
        {name}
      </Text>
      <Text fontSize='1.1rem' fontWeight='400' color={color ?? 'inherit'}>
        {prefix}
        {formatMoney(money)}
      </Text>
    </HStack>
  );
};

const Fee = ({ shippingFee, cartState }) => {
  return (
    <VStack w='full' my={2}>
      {[
        {
          name: 'Tạm tính',
          money: cartState?.data?.totalPrice || 0,
        },
        {
          name: 'Phí vận chuyển',
          money: shippingFee?.total || 0,
        },
        {
          name: 'Sử dụng voucher',
          money: cartState?.data?.voucherDiscount || 0,
          prefix: '-',
          color: 'red.500',
        },
        {
          name: 'Sử dụng xu',
          money: cartState?.data?.pointDiscount || 0,
          prefix: '-',
          color: 'red.500',
        },
      ].map(text => {
        return <DetailText key={text.name} {...text} />;
      })}

      <Divider />
      <HStack w='full' justifyContent='space-between' mt={2}>
        <Text color='gray.700' fontSize='0.95rem' fontWeight='600'>
          Tổng tiền
        </Text>
        <Text fontSize='1.5rem' color='pink.400'>
          {formatMoney(
            cartState?.data?.totalPriceAfterDiscount + shippingFee?.total
          )}
        </Text>
      </HStack>
    </VStack>
  );
};

export default Fee;
