/* eslint-disable react/prop-types */
import {
  useChangeQuantityMutation,
  useRemoveFromCartMutation,
} from '@/apis/cartApi';
import MinusIcon from '@/assets/Icon/minus';
import PlusIcon from '@/assets/Icon/plus';
import TrashIcon from '@/assets/Icon/trash';
import formatMoney from '@/utils/formatMoney';
import {
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useThrottle } from 'use-throttle';
import { increaseQuantity, removeFromCart } from '../cartSlice';

const Quantity = ({ value, productID, auth }) => {
  const dispatch = useDispatch();
  const [changeQuantityAPI] = useChangeQuantityMutation();
  const handleIncQuantity = async quantity => {
    try {
      if (value + quantity > 0) {
        dispatch(increaseQuantity({ productID, quantity }));
        await changeQuantityAPI({
          userID: auth.userData.userID,
          productID,
          data: {
            quantity: value + quantity,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const throttledText = useThrottle(value, 100);

  return (
    <HStack flex='1' gap='4' userSelect='none'>
      <Center
        cursor='pointer'
        p='3'
        bg='gray.200'
        borderRadius='50%'
        fontSize='1rem'
        onClick={() => handleIncQuantity(-1)} // Decrease 1
      >
        <Icon as={MinusIcon} />
      </Center>
      <Box>{throttledText}</Box>
      <Center
        cursor='pointer'
        p='3'
        bg='gray.200'
        borderRadius='50%'
        fontSize='1rem'
        onClick={() => handleIncQuantity(1)} // Increase 1
      >
        <Icon as={PlusIcon} />
      </Center>{' '}
    </HStack>
  );
};

const CartItem = ({ data }) => {
  const authState = useSelector(state => state.auth);
  const [removeFromCartAPI] = useRemoveFromCartMutation();
  const dispatch = useDispatch();
  const handleRemove = async productID => {
    try {
      dispatch(removeFromCart(productID));
      await removeFromCartAPI({
        userID: authState.userData.userID,
        productID,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      flexDir='row'
      p={4}
      borderRadius='8px'
      gap='2'
      borderBottom='1px solid'
      borderColor='gray.300'
    >
      <Box>
        <Image src='https://picsum.photos/100' borderRadius='4px' />
      </Box>
      <Box alignSelf='center' flex='2'>
        <Text>{data.productName}</Text>
      </Box>
      <Quantity
        value={data.quantity}
        productID={data.productId}
        auth={authState}
      />
      <Box alignSelf='center' flex='2' textAlign='center' userSelect='none'>
        {data.salePrice === 0 ? (
          <Text fontSize='1rem'>
            {formatMoney(data.originalPrice * data.quantity)}
          </Text>
        ) : (
          <HStack justifyContent='center'>
            <Text>{formatMoney(data.salePrice * data.quantity)} </Text>
            <Text as='s' fontSize='0.95rem' color='gray.500'>
              {formatMoney(data.originalPrice * data.quantity)}
            </Text>
          </HStack>
        )}
      </Box>
      <Box
        cursor='pointer'
        alignSelf='center'
        onClick={() => handleRemove(data.productId)}
      >
        <Icon as={TrashIcon} fontSize='1.2rem' />
      </Box>
    </Stack>
  );
};

export default CartItem;
