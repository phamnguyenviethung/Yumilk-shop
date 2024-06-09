/* eslint-disable react/prop-types */
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
import { FiMinus, FiPlus } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity } from '../cartSlice';
import { useChangeQuantityMutation } from '@/apis/cartApi';

const Quantity = ({ value, productID, auth }) => {
  const dispatch = useDispatch();
  const [changeQuantityAPI] = useChangeQuantityMutation();

  const handleClick = quantity => {
    try {
      if (value + quantity > 0) {
        dispatch(increaseQuantity({ productID, quantity }));
        if (auth.isAuthenticated) {
          changeQuantityAPI({
            userID: auth.userData.userID,
            productID,
            data: {
              quantity: value + quantity,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HStack flex='1' gap='4'>
      <Center
        cursor='pointer'
        p='3'
        bg='gray.200'
        borderRadius='50%'
        fontSize='1rem'
        onClick={() => handleClick(-1)} // Decrease 1
      >
        <Icon as={FiMinus} />
      </Center>
      <Box>{value}</Box>
      <Center
        cursor='pointer'
        p='3'
        bg='gray.200'
        borderRadius='50%'
        fontSize='1rem'
        onClick={() => handleClick(1)} // Increase 1
      >
        <Icon as={FiPlus} />
      </Center>{' '}
    </HStack>
  );
};

const CartItem = ({ data }) => {
  const authState = useSelector(state => state.auth);
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
      <Box alignSelf='center' flex='2' textAlign='center'>
        <Text>{formatMoney(data.price * data.quantity)}</Text>
      </Box>
      <Box alignSelf='center'>
        <Icon as={FiTrash2} />
      </Box>
    </Stack>
  );
};

export default CartItem;
