/* eslint-disable react/prop-types */
import { useCancelOrderMutation } from '@/apis/orderApi';
import order from '@/constants/order';
import formatMoney from '@/utils/formatMoney';
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  Stack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
const DetailsText = ({ data, isTag, tagColor, color }) => {
  return (
    <HStack
      w='full'
      justifyContent='space-between'
      fontSize={{
        base: '1rem',
        lg: '1.1rem',
      }}
    >
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

const Info = ({ data, id }) => {
  const [cancelOrderAPI, { isLoading }] = useCancelOrderMutation();

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box w='full'>
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
            <Button flex='1' colorScheme='pink'>
              Theo dõi đơn hàng
            </Button>
            <Button
              flex='1'
              colorScheme='red'
              variant='outline'
              isLoading={isLoading}
              onClick={handleCancel}
              isDisabled={
                ![order.PENDING.text, order.PROCESSING.text].includes(
                  data.orderStatus
                )
              }
            >
              Huỷ đơn hàng
            </Button>
          </ButtonGroup>
        </VStack>
      </Stack>
    </>
  );
};

export default Info;
