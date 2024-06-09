import CartItems from '@/features/Cart/CastItems';
import { Box, Container, Stack } from '@chakra-ui/react';

const Cart = () => {
  return (
    <Container maxW='container.xl'>
      <Stack direction={['column', 'column', 'row']} gap='4'>
        <CartItems />
        <Box flex='1'>cartinfo</Box>
      </Stack>
    </Container>
  );
};

export default Cart;
