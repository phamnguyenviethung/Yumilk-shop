import { useReloadCartMutation } from '@/apis/cartApi';
import NeedActiveDialog from '@/components/Dialog/NeedActiveDialog';
import Loading from '@/components/Loading';
import CartInfo from '@/features/Cart/CartInfo';
import CartItems from '@/features/Cart/CastItems';
import EmptyCart from '@/features/Cart/EmptyCart';
import { Box, Center, Container, Stack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
  const cartState = useSelector(state => state.cart);
  const authState = useSelector(state => state.auth);
  const [reloadCartAPI, { isLoading }] = useReloadCartMutation();

  useEffect(() => {
    const run = async () => {
      try {
        await reloadCartAPI(authState?.userData?.userID);
      } catch (error) {
        console.log(error);
      }
    };
    if (authState?.isAuthenticated) {
      run();
    }
  }, [authState?.isAuthenticated, authState?.userData?.userID, reloadCartAPI]);

  if (isLoading) {
    return (
      <Center boxSize='full'>
        <Loading />
      </Center>
    );
  }

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
