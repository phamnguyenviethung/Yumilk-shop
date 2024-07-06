import { useGetMyAddressQuery } from '@/apis/customerApi';
import { useCheckOutMutation, useGetShippingFeeQuery } from '@/apis/orderApi';
import NeedActiveDialog from '@/components/Dialog/NeedActiveDialog';
import NoAddressDialog from '@/components/Dialog/NoAddressDialog';
import order from '@/constants/order';
import AddressSelect from '@/features/Checkout/AddressSelect';
import Fee from '@/features/Checkout/Fee';
import PaymentMethods from '@/features/Checkout/PaymentMethods';
import ProductList from '@/features/Checkout/ProductList';
import {
  Button,
  Container,
  HStack,
  Stack,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const cartState = useSelector(state => state.cart);
  const authState = useSelector(state => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nav = useNavigate();
  const [selectIndex, setSelectIndex] = useState(0);
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(order.COD_PAYMENT);

  const { data, isLoading, isFetching } = useGetMyAddressQuery();
  const [
    checkoutAPI,
    { isLoading: checkoutLoading, isFetching: checkoutFetching },
  ] = useCheckOutMutation();
  const { data: shippingFee, isLoading: cartLoading } = useGetShippingFeeQuery(
    {
      fromDistrictId: data?.length > 0 ? data[selectIndex].districtId : '',
      fromWardCode: data?.length > 0 ? data[selectIndex].wardCode : '',
      totalWeight: cartState?.data?.totalGram || 2000,
    },
    {
      skip: isLoading || isFetching,
    }
  );

  const handleSelect = n => {
    setSelectIndex(n);
  };

  if (isLoading || cartLoading) return <p>loading..</p>;
  const handleClick = async () => {
    try {
      const d = {
        note,
        paymentMethod,
        addressId: data[selectIndex].id,
        shippingFee: shippingFee.total,
      };
      const res = await checkoutAPI(d);
      if (res.error) throw res.error.data;
      if (paymentMethod === order.PAYOS_PAYMENT) {
        window.location.href = res.data.checkoutUrl;
      } else {
        nav(`/order/${res.data.orderId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxW='container.xl' pt='2rem'>
      <Stack
        direction={['column', 'column', 'row']}
        gap={[16, 16, 4]}
        fontWeight='500'
      >
        <VStack w='full' flex='4'>
          <ProductList />
          <PaymentMethods method={paymentMethod} setMethod={setPaymentMethod} />
          <Textarea
            mt={6}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder='Ghi chú'
            focusBorderColor='pink.400'
            border='1px solid'
            borderColor='pink.500'
            colorScheme='pink'
            size='lg'
            rows='5'
          />
        </VStack>

        <VStack flex='1' gap='4'>
          {data.length > 0 && (
            <>
              <HStack justify='space-between' w='full' fontWeight='500'>
                <Text color='gray.500' userSelect='none'>
                  Giao tới
                </Text>
                <Text color='pink.400' cursor='pointer' onClick={onOpen}>
                  Thay đổi
                </Text>
              </HStack>
              <AddressSelect
                addressSelected={data[selectIndex]}
                addressList={data}
                isOpen={isOpen}
                onClose={onClose}
                handleSelect={handleSelect}
              />
            </>
          )}
          <Fee cartState={cartState} shippingFee={shippingFee} />
          <Button
            mt={2}
            size='lg'
            colorScheme='pink'
            w='full'
            onClick={handleClick}
            isDisabled={cartState.data.cartItems.totalCount === 0}
            isLoading={checkoutLoading || checkoutFetching}
          >
            Đặt hàng
          </Button>
        </VStack>
      </Stack>
      <NoAddressDialog isOpen={data.length === 0} />
      <NeedActiveDialog isOpen={!authState?.userData?.isActive} />
    </Container>
  );
};

export default Checkout;
