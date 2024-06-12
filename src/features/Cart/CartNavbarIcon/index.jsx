/* eslint-disable react/prop-types */
import { useGetCartQuery } from '@/apis/cartApi';
import { Box, Center, Icon, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCartData } from '../cartSlice';
import CartIcon from '@/assets/Icon/cart';

const Cart = ({ count }) => {
  return (
    <Box pos='relative'>
      <Center p='3' borderRadius='100%'>
        <Icon as={CartIcon} fontSize='1.2rem' />
      </Center>{' '}
      <Box pos='absolute' top='-20%' right='-20%'>
        <Center
          p='2'
          boxSize='24px'
          bgColor='pink.400'
          borderRadius='100%'
          color='white'
        >
          <Text fontSize='1rem' userSelect='none'>
            {count || 0}
          </Text>
        </Center>
      </Box>
    </Box>
  );
};

const AuthenticatedCartIcon = ({ userID }) => {
  const cartState = useSelector(state => state.cart);
  const { data } = useGetCartQuery({ userID });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCartData(data));
  }, [data, dispatch]);
  return <Cart count={cartState?.data?.cartItems?.totalCount} />;
};

const CartNavbarIcon = () => {
  const authState = useSelector(state => state.auth);
  if (!authState.isAuthenticated) return <Cart />;
  return <AuthenticatedCartIcon userID={authState?.userData?.userID} />;
};

export default CartNavbarIcon;
