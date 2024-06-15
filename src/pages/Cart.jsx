import CartInfo from '@/features/Cart/CartInfo';
import CartItems from '@/features/Cart/CastItems';
import { Container, Stack } from '@chakra-ui/react';

const Cart = () => {
  return (
    <Container maxW='container.xl' pt='2rem'>
      <Stack direction={['column', 'column', 'row']} gap='4' fontWeight='500'>
        <CartItems />
        <CartInfo />
      </Stack>
    </Container>
  );
};

export default Cart;
