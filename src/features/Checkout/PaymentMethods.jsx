/* eslint-disable react/prop-types */
import order from '@/constants/order';
import { Box, Heading, Radio, Stack } from '@chakra-ui/react';

const data = [
  {
    name: 'Thanh toán bằng tiền mặt',
    value: order.COD_PAYMENT,
  },
  {
    name: 'Thanh toán bằng ngân hàng',
    value: order.PAYOS_PAYMENT,
  },
];

const PaymentMethods = ({ setMethod, method }) => {
  return (
    <Box w='full' mt={6}>
      <Box>
        <Heading as={'h6'} fontSize='1.2rem' fontWeight='600' my={4}>
          Phương tác thanh toán
        </Heading>
        <Stack>
          {data.map(item => {
            return (
              <Radio
                key={item.value}
                size='md'
                onChange={() => setMethod(item.value)}
                colorScheme='pink'
                isChecked={item.value === method}
              >
                {item.name}
              </Radio>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default PaymentMethods;
