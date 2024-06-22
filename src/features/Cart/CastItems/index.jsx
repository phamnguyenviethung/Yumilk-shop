/* eslint-disable react/prop-types */
import { Stack } from '@chakra-ui/react';
import CartItem from './CartItem';

const CartItems = ({ cartState }) => {
  return (
    <Stack flex='3'>
      {cartState?.data?.cartItems?.items.map(item => {
        return <CartItem key={item.productName} data={item} />;
      })}
    </Stack>
  );
};

export default CartItems;
