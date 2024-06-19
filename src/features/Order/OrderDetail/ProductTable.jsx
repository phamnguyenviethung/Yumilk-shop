/* eslint-disable react/prop-types */
import formatMoney from '@/utils/formatMoney';
import {
  Box,
  Divider,
  Flex,
  HStack,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';

const ProductTable = ({ data }) => {
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
            </Tr>
          </Thead>
          <Tbody>
            {data.orderDetail.map(product => {
              return (
                <Tr key={product.productId}>
                  <Td>
                    <HStack>
                      <Box
                        boxSize={{
                          base: '80px',
                          lg: '100px',
                        }}
                      >
                        <Image
                          boxSize='full'
                          src={product.thumbnail}
                          fallbackSrc='https://placehold.co/100'
                          borderRadius='4px'
                        />
                      </Box>
                      <Text fontWeight='600'>{product.productName}</Text>
                    </HStack>
                  </Td>
                  <Td isNumeric>{product.quantity}</Td>
                  <Td isNumeric>{formatMoney(product.unitPrice)}</Td>
                  <Td
                    isNumeric
                    color='pink.400'
                    fontWeight='600'
                    fontSize='1.2rem'
                  >
                    {formatMoney(product.itemPrice)}
                  </Td>
                </Tr>
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
