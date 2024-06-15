import { Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

const CartItems = () => {
  const cartState = useSelector(state => state.cart);

  return (
    <Stack flex='3'>
      {cartState?.data?.cartItems?.items.map(item => {
        return <CartItem key={item.productName} data={item} />;
      })}
    </Stack>
  );
};

export default CartItems;
