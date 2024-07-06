/* eslint-disable react/prop-types */
import { useAddToCartMutation } from '@/apis/cartApi';
import AuthIcon from '@/assets/Icon/auth';
import CartIcon from '@/assets/Icon/cart';
import MoneyBackIcon from '@/assets/Icon/moneyback';
import PackageSearchIcon from '@/assets/Icon/packagesearch';
import NeedLoginDialog from '@/components/Dialog/NeedLoginDialog';
import { addToCart } from '@/features/Cart/cartSlice';
import formatMoney from '@/utils/formatMoney';
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { PiStarFill } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';

const policies = [
  {
    value: 'Được hoàn tiền 200% nếu là hàng giả.',
    icon: MoneyBackIcon,
  },
  {
    value: 'Được đồng kiểm khi nhận hàng.',
    icon: PackageSearchIcon,
  },
  {
    value: 'Hàng chính hãng 100%.',
    icon: AuthIcon,
  },
];

const ProductInfo = ({ productData }) => {
  const [quantity, setQuantity] = useState(1);
  const [addToCartAPI] = useAddToCartMutation();
  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleAddtoCart = async () => {
    try {
      dispatch(addToCart(productData));

      const res = await addToCartAPI({
        userID: authState?.userData?.userID,
        data: {
          productId: productData.id,
          quantity,
        },
      });
      if (res.error) throw res.error.data;
      toast({
        title: 'Đã thêm vào giỏ hàng',
        status: 'success',
        duration: 800,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <VStack
      boxSize='full'
      textAlign='left'
      justifyContent='space-between'
      pb={2}
    >
      <VStack textAlign='left' gap='2' w='full' flex='1'>
        <Heading
          w='full'
          as='h2'
          fontSize={{
            base: '1.6rem',
            lg: '2rem',
          }}
          fontWeight='500'
        >
          {[productData?.name]}
        </Heading>
        <Flex w='full' alignItems='center'>
          <HStack alignItems='center' fontSize='1rem' gap='4'>
            <HStack gap='1'>
              <Box color='pink.400' fontWeight='500'>
                4.9
              </Box>
              <Icon as={PiStarFill} color='yellow.500' />
              <Icon as={PiStarFill} color='yellow.500' />
              <Icon as={PiStarFill} color='yellow.500' />
              <Icon as={PiStarFill} color='yellow.500' />
              <Icon as={PiStarFill} color='yellow.500' />
            </HStack>

            <Box>
              <Box color='pink.400' fontWeight='500'>
                <Text>
                  {productData.orderCount}{' '}
                  <Text display='inline' color='gray.500' fontWeight='400'>
                    đã bán
                  </Text>
                </Text>
              </Box>
            </Box>
          </HStack>
        </Flex>
        <Box w='full' my={4}>
          {productData.salePrice !== 0 && (
            <Text
              as='s'
              w='full'
              color='gray.400'
              my={4}
              fontSize='1.2rem'
              fontWeight='600'
            >
              {formatMoney(productData.originalPrice)}
            </Text>
          )}
          <Text w='full' color='pink.400' fontSize={'2rem'} fontWeight='800'>
            {formatMoney(
              productData.salePrice === 0
                ? productData.originalPrice
                : productData.salePrice
            )}
          </Text>
          <Text
            display={{
              base: 'block',
              lg: 'none',
            }}
            fontSize='0.9rem'
            color='gray.500'
            fontWeight='600'
          >
            {productData.quantity} sản phầm có sẵn
          </Text>
        </Box>
      </VStack>
      <Stack flexDirection='column' w='full' gap='2' flex='2'>
        <Stack
          flexDirection={{
            base: 'row',
            lg: 'column',
          }}
          w='full'
          flex='2'
        >
          <Stack
            alignItems={{
              base: 'auto',
              lg: 'center',
            }}
            flexDirection={{
              base: 'column-reverse',
              lg: 'row',
            }}
            w='full'
            gap='2'
          >
            <NumberInput
              defaultValue={productData.quantity > 0 ? 1 : 0}
              value={productData.quantity > 0 ? quantity : 0}
              min={productData.quantity > 0 ? 1 : 0}
              max={productData.quantity}
              onChange={setQuantity}
            >
              <NumberInputField
                colorScheme='pink'
                _focusVisible={{
                  border: '1.2px solid',
                  borderColor: 'pink.400',
                  outline: 0,
                }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text
              display={{
                base: 'none',
                lg: 'block',
              }}
              fontSize='0.9rem'
              color='gray.500'
              fontWeight='600'
            >
              {productData.quantity} sản phầm có sẵn
            </Text>
          </Stack>
          <Box w='full' mt={[0, 0, 4]}>
            <Button
              size={['sm', 'md', 'lg']}
              colorScheme='pink'
              leftIcon={<Icon as={CartIcon} fontWeight='800' />}
              onClick={authState.isAuthenticated ? handleAddtoCart : onOpen}
              isDisabled={productData.quantity === 0}
            >
              {productData.quantity === 0 ? 'Đã hết hàng' : 'Thêm vào giỏ hàng'}
            </Button>
          </Box>
        </Stack>
        <VStack
          mt={[8, 8, 0]}
          w='full'
          gap='4'
          p={4}
          border='1px solid'
          borderColor='pink.400'
          borderRadius='10px'
        >
          {policies.map(item => {
            return (
              <Flex
                alignItems='center'
                w='full'
                key={item.value}
                fontSize='1rem'
                fontWeight='500'
              >
                <Icon
                  as={item.icon}
                  mr={2}
                  color='pink.400'
                  fontSize='1.5rem'
                />
                {item.value}
              </Flex>
            );
          })}
        </VStack>
      </Stack>
      <NeedLoginDialog onClose={onClose} isOpen={isOpen} />
    </VStack>
  );
};

export default ProductInfo;
