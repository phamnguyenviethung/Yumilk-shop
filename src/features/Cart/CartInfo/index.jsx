import { Button, VStack } from '@chakra-ui/react';
import Fee from './Fee';
import { Link } from 'react-router-dom';

const CartInfo = () => {
  return (
    <VStack flex='1' w='full' gap='4'>
      <Fee />
      <Link to='/checkout' style={{ width: '100%' }}>
        <Button w='full' colorScheme='pink' mt={2}>
          Mua ngay
        </Button>
      </Link>
    </VStack>
  );
};

export default CartInfo;
