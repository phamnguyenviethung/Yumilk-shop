import { Box, Center, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCartData } from '../cartSlice';
import { useGetCartQuery } from '@/apis/cartApi';

const CartNavbarIcon = () => {
  const cartState = useSelector(state => state.cart);
  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { data } = useGetCartQuery({ userID: authState?.userData?.userID });
  useEffect(() => {
    dispatch(setCartData(data));
  }, [data, dispatch]);

  return (
    <Box pos='absolute' top='-20%' right='-20%'>
      <Center
        p='2'
        boxSize='24px'
        bgColor='red.400'
        borderRadius='100%'
        color='white'
      >
        <Text fontSize='1rem'>
          {cartState?.data?.cartItems?.totalCount || 0}
        </Text>
      </Center>
    </Box>
  );
};

export default CartNavbarIcon;
