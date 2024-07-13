/* eslint-disable react/prop-types */
import { useGetCartQuery } from '@/apis/cartApi';
import { HStack, Switch, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCartData } from '../Cart/cartSlice';

const UsePoint = ({ cartState }) => {
  const [isUsingPoint, setisUsingPoint] = useState(false);
  const authState = useSelector(state => state.auth);
  const { data } = useGetCartQuery({
    userID: authState?.userData?.userID,
    params: {
      isUsingPoint,
      voucherId: cartState?.data?.voucherId,
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCartData(data));
  }, [data, dispatch, isUsingPoint]);
  return (
    <HStack w='full' justifyContent='space-between'>
      <Text>Sử dụng xu</Text>
      <Switch
        isChecked={isUsingPoint}
        colorScheme='pink'
        onChange={() => {
          setisUsingPoint(!isUsingPoint);
        }}
      />
    </HStack>
  );
};

export default UsePoint;
