/* eslint-disable react/prop-types */
import { useCancelOrderMutation } from '@/apis/orderApi';
import order from '@/constants/order';
import formatMoney from '@/utils/formatMoney';
import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  Stack,
  Tag,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRef } from 'react';
const DetailsText = ({ data, isTag, tagColor, color }) => {
  return (
    <HStack w='full' justifyContent='space-between' fontSize='1rem'>
      <Text flex='1' fontWeight='400'>
        {data.name}:
      </Text>
      {isTag ? (
        <Tag size={['md', 'md', 'lg']} colorScheme={tagColor}>
          {data.value}
        </Tag>
      ) : (
        <Text
          flex='2'
          textAlign='right'
          fontWeight='500'
          color={color ? color : 'gray.800'}
        >
          {data.value}
        </Text>
      )}
    </HStack>
  );
};

function DeleteDialog({ isOpen, onClose, handleClick }) {
  const cancelRef = useRef();

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Huỷ đơn hàng
            </AlertDialogHeader>

            <AlertDialogBody>Bạn có muốn huỷ đơn hàng?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Trở về
              </Button>
              <Button colorScheme='red' onClick={handleClick} ml={3}>
                Xác nhận huỷ
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

const Info = ({ data, id }) => {
  const [cancelOrderAPI, { isLoading }] = useCancelOrderMutation();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = useToast();
  const orderInfo = [
    {
      name: 'Mã đơn hàng',
      value: id,
    },
    {
      name: 'Ngày đặt hàng',
      value: dayjs(data.createdAt).format('HH:mm DD/MM/YYYY'),
    },
    {
      name: 'Ghi chú',
      value: data.note,
      color: 'red.500',
    },
    {
      name: 'Phương thức thanh toán',
      value:
        data.paymentMethod === order.COD_PAYMENT
          ? 'Thanh toán bằng tiền mặt'
          : 'Thanh toán qua ngân hàng',
    },
    {
      name: 'Tổng tiền',
      value: formatMoney(data.totalAmount),
      isTag: true,
      tagColor: 'pink',
    },

    {
      name: 'Trạng thái',
      value: order[data.orderStatus.toUpperCase()].text,
      isTag: true,
      tagColor: order[data.orderStatus.toUpperCase()].color,
    },
  ];
  const customerInfo = [
    {
      name: 'Người nhận',
      value: data.recieverName,
    },
    {
      name: 'Số điện thoại',
      value: data.phoneNumber,
    },
    {
      name: 'Địa chỉ',
      value: data.address,
    },
  ];

  const handleCancel = async () => {
    try {
      const res = await cancelOrderAPI(id);
      if (res.error) throw res.error.data;
      onClose();
      toast({
        title: 'Huỷ thành công',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Huỷ thất bại',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <Box w='full'>
        {data.paymentMethod === order.PAYOS_PAYMENT &&
          data.orderStatus === order.PENDING.name && (
            <Alert status='info' mb={4}>
              <AlertIcon />
              Hệ thống sẽ cần một lúc để xử lý thanh toán của bạn.
            </Alert>
          )}

        <Heading variant='h6' fontSize='1.6rem' fontWeight='500'>
          Chi tiết đơn hàng
        </Heading>
      </Box>
      <Stack
        gap={{ base: 4, lg: 1 }}
        w='full'
        direction={{
          base: 'column',
          lg: 'row',
        }}
      >
        <Box
          flex='1'
          border='0.3px solid'
          borderColor='gray.200'
          p='4'
          borderRadius='8px'
        >
          <Text mb={4} fontWeight='600' fontSize='1.2rem'>
            Thông tin đơn hàng:
          </Text>
          <VStack gap='4' w='full'>
            {orderInfo.map(d => {
              return <DetailsText key={d.name} data={d} {...d} />;
            })}
          </VStack>
        </Box>
        <VStack
          gap='2'
          flex='1'
          border='0.3px solid'
          borderColor='gray.200'
          py={2}
          px={4}
          borderRadius='8px'
        >
          <Text w='full' mb={4} fontWeight='600' fontSize='1.2rem'>
            Thông tin khách hàng:
          </Text>
          <VStack gap='4' w='full' flex='1'>
            {customerInfo.map(d => {
              return <DetailsText key={d.name} data={d} {...d} />;
            })}
          </VStack>
          <ButtonGroup
            w='full'
            size={{
              base: 'sm',
              lg: 'md',
            }}
            mt='6'
          >
            {data.paymentMethod === order.PAYOS_PAYMENT &&
              data.orderStatus === order.PENDING.name && (
                <Button flex='1' colorScheme='pink'>
                  Thanh toán lại
                </Button>
              )}
            <Button
              flex='1'
              colorScheme='red'
              variant='outline'
              isLoading={isLoading}
              onClick={onOpen}
              isDisabled={
                ![order.PENDING.name, order.PROCESSING.name].includes(
                  data.orderStatus
                )
              }
            >
              Huỷ đơn hàng
            </Button>
          </ButtonGroup>
        </VStack>
      </Stack>
      <DeleteDialog
        isOpen={isOpen}
        onClose={onClose}
        handleClick={handleCancel}
      />
    </>
  );
};

export default Info;
