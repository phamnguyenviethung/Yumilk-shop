/* eslint-disable react/prop-types */
import formatMoney from '@/utils/formatMoney';
import {
  Box,
  Divider,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import ProductRow from './ProductRow';
import order from '@/constants/order';

const ProductTable = ({ data, orderId }) => {
  return (
    <Box w='full'>
      <TableContainer>
        <Table variant='simple'>
          <Thead bgColor='pink.100'>
            <Tr>
              <Th>Sản phẩm</Th>
              <Th isNumeric>Số lượng</Th>
              <Th isNumeric>Giá</Th>
              <Th isNumeric>Tổng tiền</Th>
              {data.orderStatus === order.DELIVERED.name && (
                <Th isNumeric>Đánh giá</Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {data.orderDetail.map(product => {
              return (
                <ProductRow
                  key={product.productId}
                  orderId={orderId}
                  product={product}
                />
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex mt={4} w='full' justifyContent='flex-end'>
        <VStack
          w={{
            base: '70%',
            lg: '30%',
          }}
        >
          <Flex w='full' justifyContent='space-between'>
            <Text>Tạm tính</Text>
            <Text>{formatMoney(data.totalPrice)}</Text>
          </Flex>
          <Flex w='full' justifyContent='space-between'>
            <Text>Phí vận chuyển</Text>
            <Text>{formatMoney(data.shippingFee)}</Text>
          </Flex>
          <Divider />
          <Flex w='full' justifyContent='space-between'>
            <Text fontWeight='600' fontSize='1.1rem'>
              Tổng tiền
            </Text>
            <Text color='pink.400' fontWeight='600' fontSize='1.5rem'>
              {formatMoney(data.shippingFee + data.totalPrice)}
            </Text>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};

export default ProductTable;
