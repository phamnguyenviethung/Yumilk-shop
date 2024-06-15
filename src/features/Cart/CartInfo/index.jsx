import { Button, VStack } from '@chakra-ui/react';
import Fee from './Fee';

const CartInfo = () => {
  return (
    <VStack flex='1' w='full' gap='4'>
      <Fee />
      <Button w='full' colorScheme='pink' mt={2}>
        Mua ngay
      </Button>
    </VStack>
  );
};

export default CartInfo;
