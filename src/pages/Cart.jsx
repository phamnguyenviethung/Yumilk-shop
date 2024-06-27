import NeedActiveDialog from '@/components/Dialog/NeedActiveDialog';
import CartInfo from '@/features/Cart/CartInfo';
import CartItems from '@/features/Cart/CastItems';
import EmptyCart from '@/features/Cart/EmptyCart';
import { Box, Container, Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Cart = () => {
  const cartState = useSelector(state => state.cart);
  const authState = useSelector(state => state.auth);

  return (
    <Container maxW='container.xl' pt='2rem'>
      {cartState?.data?.cartItems?.totalCount === 0 ? (
        <Box w='full'>
          <EmptyCart />
        </Box>
      ) : (
        <Stack direction={['column', 'column', 'row']} gap='4' fontWeight='500'>
          <CartItems cartState={cartState} />
          <CartInfo />
        </Stack>
      )}
      <NeedActiveDialog isOpen={!authState?.userData?.isActive} />
    </Container>
  );
};

export default Cart;
