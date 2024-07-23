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
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Icon,
  Image,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useThrottle } from 'use-throttle';
import { increaseQuantity, removeFromCart } from '../cartSlice';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const Quantity = ({ value, productID, auth, maxQuantity }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = useRef();

  const [changeQuantityAPI] = useChangeQuantityMutation();
  const handleIncQuantity = async quantity => {
    try {
      if (value + quantity > maxQuantity) {
        onOpen();
      } else if (value + quantity > 0) {
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
    <>
      <Stack
        flexDirection={{
          base: 'column',
          lg: 'row',
        }}
        flex='1'
        gap='4'
        userSelect='none'
        alignItems='center'
        justifyContent='center'
      >
        <Center
          cursor='pointer'
          p={[2, 2, 3]}
          bg='gray.200'
          borderRadius='50%'
          fontSize={['0.9rem', '0.9rem', '1rem']}
          onClick={() => handleIncQuantity(-1)} // Decrease 1
        >
          <Icon as={MinusIcon} />
        </Center>
        <Box>{throttledText}</Box>
        <Center
          cursor='pointer'
          p={[2, 2, 3]}
          bg='gray.200'
          borderRadius='50%'
          fontSize={['0.9rem', '0.9rem', '1rem']}
          onClick={() => handleIncQuantity(1)} // Increase 1
        >
          <Icon as={PlusIcon} />
        </Center>{' '}
      </Stack>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Thông báo
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>Số lượng hàng không đủ</AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme='pink' ref={cancelRef} onClick={onClose}>
                Đã hiểu
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
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
      fontWeight='500'
    >
      <Stack
        as={Link}
        to={`/product/${data.productId}`}
        flex='4'
        direction={{
          base: 'row',
          lg: 'row',
        }}
      >
        <Box
          boxSize={{
            base: '80px',
            lg: '100px',
          }}
        >
          <Image
            boxSize='full'
            src={data.thumbnail}
            fallbackSrc='https://placehold.co/100'
            borderRadius='4px'
          />
        </Box>
        <Box alignSelf='center' flex='1'>
          <Text>{data.productName}</Text>
        </Box>
      </Stack>
      <Quantity
        value={data.quantity}
        productID={data.productId}
        auth={authState}
        maxQuantity={data.productQuantity}
      />
      <Box alignSelf='center' flex='2' textAlign='center' userSelect='none'>
        {data.salePrice === 0 ? (
          <Text fontSize='1rem'>
            {formatMoney(data.originalPrice * data.quantity)}
          </Text>
        ) : (
          <Stack
            flexDirection={{
              base: 'column',
              lg: 'row',
            }}
            justifyContent='center'
          >
            <Text color='pink.400'>
              {formatMoney(data.salePrice * data.quantity)}{' '}
            </Text>
            <Text as='s' fontSize='0.9rem' color='gray.500'>
              {formatMoney(data.originalPrice * data.quantity)}
            </Text>
          </Stack>
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
