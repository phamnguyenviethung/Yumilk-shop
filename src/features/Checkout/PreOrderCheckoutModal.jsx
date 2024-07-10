/* eslint-disable react/prop-types */
import { useGetMyAddressQuery } from '@/apis/customerApi';
import {
  useGetShippingFeeQuery,
  usePreOrderCheckOutMutation,
} from '@/apis/orderApi';
import formatMoney from '@/utils/formatMoney';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tag,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { PiArrowLeft, PiArrowRight } from 'react-icons/pi';
import { useSelector } from 'react-redux';

const PreOrderCheckoutModal = ({ isOpen, onClose, productData }) => {
  const [quantity, setQuantity] = useState(1);
  const authState = useSelector(state => state.auth);

  const [addressIndex, setAddressIndex] = useState(0);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const [preOrderCheckoutAPI, { isLoading: checkoutLoading }] =
    usePreOrderCheckOutMutation();
  const {
    data: addressData,
    isLoading: addressLoading,
    isFetching: addressFetching,
  } = useGetMyAddressQuery(authState?.userData?.userID);
  const { data: shippingFee, isFetching } = useGetShippingFeeQuery(
    {
      fromDistrictId:
        addressData?.length > 0 ? addressData[addressIndex].districtId : '',
      fromWardCode:
        addressData?.length > 0 ? addressData[addressIndex].wardCode : '',
      totalWeight: productData.totalWeight || 2000,
    },
    {
      skip: addressLoading || addressFetching,
    }
  );

  if (addressLoading) return <p></p>;

  const handleCheckout = async () => {
    try {
      setError('');
      const res = await preOrderCheckoutAPI({
        productId: productData.id,
        quantity: quantity * 1,
        shippingFee: shippingFee.total,
        addressId: addressData[addressIndex].id,
        note,
      });
      if (res.error) throw res.error.data;
      window.location.href = res.data.checkoutUrl;
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  return (
    <Modal
      closeOnOverlayClick={false}
      onClose={onClose}
      isOpen={isOpen}
      motionPreset='slideInBottom'
      size='xl'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Đặt trước</ModalHeader>
        <ModalCloseButton />
        <VStack as={ModalBody} pb={8} gap='8'>
          <Box w='full'>
            <Text
              fontSize={{
                base: '1rem',
                lg: '1.2rem',
              }}
              color='pink.400'
              fontWeight='600'
              mb={2}
            >
              Sản phẩm
            </Text>
            <Flex w='full' alignItems='center'>
              <Flex alignItems='center' flex='6'>
                <Box
                  boxSize={{
                    base: '60px',
                    lg: '80px',
                  }}
                >
                  <Image
                    borderRadius='10px'
                    boxSize='full'
                    src={productData.thumbnail}
                  />
                </Box>
                <Box>
                  <Text
                    fontWeight='500'
                    fontSize={{
                      base: '0.8rem',
                      lg: '1rem',
                    }}
                  >
                    {productData.name}
                  </Text>
                </Box>
              </Flex>
              <Box flex='2'>
                <NumberInput
                  defaultValue={productData.maxPreOrderQuantity > 0 ? 1 : 0}
                  value={productData.maxPreOrderQuantity > 0 ? quantity : 0}
                  min={productData.maxPreOrderQuantity > 0 ? 1 : 0}
                  max={productData.maxPreOrderQuantity}
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
              </Box>
            </Flex>
          </Box>
          <Box w='full'>
            <Flex
              w='full'
              justifyContent='space-between'
              alignItems='center'
              mb={2}
            >
              <Text
                fontSize={{
                  base: '1rem',
                  lg: '1.2rem',
                }}
                color='pink.400'
                fontWeight='600'
              >
                Địa chỉ
              </Text>
              <ButtonGroup colorScheme='pink' size='xs' variant='outline'>
                <Button
                  onClick={() => setAddressIndex(prev => prev - 1)}
                  isDisabled={addressIndex === 0}
                >
                  <Icon as={PiArrowLeft} />
                </Button>
                <Button
                  onClick={() => setAddressIndex(prev => prev + 1)}
                  isDisabled={addressIndex === addressData.length - 1}
                >
                  <Icon as={PiArrowRight} />
                </Button>
              </ButtonGroup>
            </Flex>
            <Box
              w='full'
              p={4}
              border='0.5px dashed'
              borderColor='pink.400'
              borderRadius='6px'
              _hover={{
                borderColor: 'pink.400',
              }}
              minH='120px'
              cursor='pointer'
            >
              {addressData[addressIndex].isDefault && (
                <Tag mb={2} colorScheme='pink' size='sm'>
                  Địa chỉ mặc định
                </Tag>
              )}
              <Text fontWeight='600' fontSize='0.9rem'>
                {addressData[addressIndex].receiverName} |{' '}
                {addressData[addressIndex].receiverPhone}
              </Text>
              <Text mt={2} color='gray.500' fontSize='0.9rem' fontWeight='500'>
                {addressData[addressIndex].address}{' '}
                {addressData[addressIndex].wardName}{' '}
                {addressData[addressIndex].districtName}{' '}
                {addressData[addressIndex].provinceName}
              </Text>
            </Box>
          </Box>
          <Box w='full'>
            <Text
              fontSize={{
                base: '1rem',
                lg: '1.2rem',
              }}
              color='pink.400'
              fontWeight='600'
            >
              Giá tiền
            </Text>
            <VStack w='full' my={2}>
              <HStack w='full' justifyContent='space-between'>
                <Text color='gray.500' fontSize='0.95rem'>
                  Giá sản phẩm ({quantity} cái)
                </Text>
                <Text fontSize='1.15rem' fontWeight='400'>
                  {formatMoney(productData.salePrice)}
                </Text>
              </HStack>
              <HStack w='full' justifyContent='space-between'>
                <Text color='gray.500' fontSize='0.95rem'>
                  Phí vận chuyển
                </Text>
                <Text fontSize='1.15rem' fontWeight='400'>
                  {formatMoney(shippingFee?.total || 0)}
                </Text>
              </HStack>
              <Divider />
              <HStack w='full' justifyContent='space-between' mt={2}>
                <Text color='gray.700' fontSize='0.95rem' fontWeight='600'>
                  Tổng tiền
                </Text>
                <Text fontSize='1.8rem' color='pink.400' fontWeight={600}>
                  {formatMoney(productData.salePrice + shippingFee?.total)}
                </Text>
              </HStack>
            </VStack>
          </Box>
          <Textarea
            mt={6}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder='Ghi chú'
            focusBorderColor='pink.400'
            border='1px solid'
            borderColor='pink.500'
            colorScheme='pink'
            size='lg'
            rows='4'
          />
          <Alert status='info' variant='subtle'>
            <AlertIcon />
            Các đơn hàng đặt trước sẽ phải thanh toán 100% qua chuyển khoản ngân
            hàng
          </Alert>
          {error && (
            <Text color='red.600' fontSize='1.2rem'>
              {error}
            </Text>
          )}
        </VStack>
        <ModalFooter>
          <Button mr={3} onClick={onClose} variant='outline' colorScheme='red'>
            Huỷ
          </Button>
          <Button
            colorScheme='pink'
            isLoading={isFetching || checkoutLoading}
            onClick={handleCheckout}
          >
            Xác nhận
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PreOrderCheckoutModal;
