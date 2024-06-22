import { useGetOrderHistoryQuery } from '@/apis/orderApi';
import formatMoney from '@/utils/formatMoney';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link as ChakraLink,
  Tag,
  Flex,
  Button,
  ButtonGroup,
  Box,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import orderConstant from '@/constants/order';
import dayjs from 'dayjs';
import { PiArrowLeft, PiArrowRight } from 'react-icons/pi';
import { useState } from 'react';

const OrderHistory = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetOrderHistoryQuery({
    pageSize: 10,
    page,
    sortColumn: 'createdAt',
    sortOrder: 'desc',
  });
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <TableContainer>
        <Table variant='simple'>
          <Thead bgColor='pink.200'>
            <Tr>
              <Th>#</Th>
              <Th>Sản phẩm</Th>
              <Th>Tổng tiền</Th>
              <Th>Ngày tạo</Th>
              <Th>Phương thức thanh toán</Th>
              <Th>Trạng thái</Th>
              <Th>Chi tiết</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.items.map(order => {
              return (
                <Tr key={order.orderId}>
                  <Td>
                    <ChakraLink
                      as={Link}
                      to={`/order/${order.orderId}`}
                      color='pink.400'
                    >
                      {order.orderId.slice(-5)}
                    </ChakraLink>
                  </Td>
                  <Td>{order.productList.length} sản phẩm</Td>
                  <Td>{formatMoney(order.totalAmount)}</Td>
                  <Td>{dayjs(order.createdAt).format('HH:mm DD/MM/YYYY')}</Td>
                  <Td>
                    <Tag
                      variant='solid'
                      size='md'
                      colorScheme={
                        order.paymentMethod === orderConstant.COD_PAYMENT
                          ? 'blue'
                          : 'green'
                      }
                    >
                      {order.paymentMethod === orderConstant.COD_PAYMENT
                        ? 'Thanh toán qua ngân hàng'
                        : 'Thanh toán bằng tiền mặt'}
                    </Tag>
                  </Td>
                  <Td>
                    <Tag
                      colorScheme={
                        orderConstant[order.orderStatus.toUpperCase()].color
                      }
                    >
                      {orderConstant[order.orderStatus.toUpperCase()].text}
                    </Tag>
                  </Td>
                  <Td>
                    <ChakraLink
                      as={Link}
                      to={`/order/${order.orderId}`}
                      color='pink.400'
                      fontWeight='600'
                    >
                      Xem chi tiết
                    </ChakraLink>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex w='full' justifyContent='space-between' my={4}>
        <Box>
          <Text>
            Trang {page}/{(data.totalCount / data.pageSize).toFixed()}
          </Text>
        </Box>
        <ButtonGroup>
          <Button
            isDisabled={!data.hasPreviousPage}
            variant='outline'
            size={{
              base: 'sm',
              lg: 'md',
            }}
            colorScheme='pink'
            onClick={() => setPage(prev => prev - 1)}
          >
            <PiArrowLeft />
          </Button>
          <Button
            isDisabled={!data.hasNextPage}
            variant='outline'
            size={{
              base: 'sm',
              lg: 'md',
            }}
            colorScheme='pink'
            onClick={() => setPage(prev => prev + 1)}
          >
            <PiArrowRight />
          </Button>
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default OrderHistory;
