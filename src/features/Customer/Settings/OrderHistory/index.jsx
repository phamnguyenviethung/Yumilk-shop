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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import orderConstant from '@/constants/order';
import dayjs from 'dayjs';

const OrderHistory = () => {
  const { data, isLoading } = useGetOrderHistoryQuery({
    pageSize: 20,
  });
  if (isLoading) return <p>Loading...</p>;
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead bgColor='pink.200'>
          <Tr>
            <Th>#</Th>
            <Th>Sản phẩm</Th>
            <Th>Tổng tiền</Th>
            <Th>Ngày tạo</Th>
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
  );
};

export default OrderHistory;
