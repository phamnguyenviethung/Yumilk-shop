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
} from '@chakra-ui/react';

const OrderHistory = () => {
  const { data, isLoading } = useGetOrderHistoryQuery();
  if (isLoading) return <p>Loading...</p>;
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Sản phẩm</Th>
            <Th>Tổng tiền</Th>
            <Th>Ngày tạo</Th>
            <Th>Trạng thái</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.items.map(order => {
            return (
              <Tr key={order.orderId}>
                <Td>{order.orderId.slice(-4)}</Td>
                <Td>{order.productList.length} sản phẩm</Td>
                <Td>{formatMoney(order.totalAmount)}</Td>
                <Td>20/12/2024</Td>
                <Td>{order.orderStatus}</Td>
                <Td></Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default OrderHistory;
