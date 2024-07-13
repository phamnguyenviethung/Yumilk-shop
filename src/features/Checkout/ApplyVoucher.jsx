/* eslint-disable react/prop-types */
import { useGetCartQuery } from '@/apis/cartApi';
import { useGetVoucherByCodeQuery } from '@/apis/voucherApi';
import { Button, Input, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useThrottle } from 'use-throttle';
import { setCartData } from '../Cart/cartSlice';

const ApplyVoucher = ({ cartState }) => {
  const [code, setCode] = useState('');
  const throttledText = useThrottle(code, 1000);
  const authState = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const { data, isLoading, isError, error, isSuccess, isFetching } =
    useGetVoucherByCodeQuery(throttledText, {
      skip: throttledText === '',
    });
  const { data: cartData } = useGetCartQuery(
    {
      userID: authState?.userData?.userID,
      params: {
        isUsingPoint: cartState?.data?.isUsingPoint,
        voucherId: data?.id,
      },
    },
    {
      skip: throttledText === '',
    }
  );
  const handleSubmit = () => {
    dispatch(setCartData(cartData));
  };
  return (
    <VStack w='full'>
      <Input
        value={code}
        onChange={e => setCode(e.target.value.trim())}
        placeholder='Nhập mã voucher'
        _hover={{
          borderColor:
            isSuccess && data?.isAvailable
              ? 'green.400'
              : isError
              ? 'red.400'
              : 'pink.400',
          outline: 0,
        }}
        _focusVisible={{}}
        _focus={{
          outline: 0,
        }}
        border='2px solid'
        borderColor={
          isSuccess && data?.isAvailable
            ? 'green.400'
            : isError
            ? 'red.400'
            : 'pink.400'
        }
        borderRadius={6}
      />
      {code !== '' && !isFetching && !isLoading && (
        <Text
          w='full'
          textAlign='left'
          fontSize='0.9rem'
          color={isSuccess && data?.isAvailable ? 'green.400' : 'red.400'}
        >
          {isSuccess && data?.isAvailable
            ? 'Voucher hợp lệ'
            : isError
            ? error.data.message
            : 'Voucher không hợp lệ hoặc không đủ điều kiện sử dụng'}
        </Text>
      )}
      <Button
        isDisabled={
          code === '' ||
          isLoading ||
          isFetching ||
          isError ||
          !data?.isAvailable
        }
        w='full'
        size='sm'
        colorScheme='pink'
        variant='outline'
        onClick={handleSubmit}
      >
        Áp dụng
      </Button>
    </VStack>
  );
};

export default ApplyVoucher;
