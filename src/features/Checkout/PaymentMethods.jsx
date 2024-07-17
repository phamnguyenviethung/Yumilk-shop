/* eslint-disable react/prop-types */
import CardIcon from '@/assets/Icon/card';
import MoneyIcon from '@/assets/Icon/money';
import order from '@/constants/order';
import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';

const data = [
  {
    name: 'Thanh toán bằng tiền mặt',
    value: order.COD_PAYMENT,
    icon: MoneyIcon,
    iconBgColor: 'green.400',
  },
  {
    name: 'Thanh toán bằng ngân hàng',
    value: order.PAYOS_PAYMENT,
    icon: CardIcon,
    iconBgColor: 'blue.400',
  },
];

const MethodBox = ({ setMethod, method, name, value, iconBgColor, icon }) => {
  return (
    <VStack
      onClick={() => setMethod(value)}
      alignItems='center'
      minH={{
        base: '150px',
        lg: '200px',
      }}
      w='full'
      borderStyle='solid'
      borderWidth={method === value ? '2px' : '0.5px'}
      borderColor={method === value ? 'pink.400' : 'blackAlpha.300'}
      _hover={{
        borderColor: method === value ? 'pink.400' : 'blackAlpha.400',
      }}
      p={2}
      borderRadius={5}
      cursor='pointer'
      transition='all 0.15s ease'
    >
      <Center flex='1' boxSize='full'>
        <Icon
          as={icon}
          fontSize='1.5rem'
          bgColor={iconBgColor}
          color='white'
          boxSize={{
            base: '40px',
            lg: '60px',
          }}
          p={2}
          borderRadius={10}
        />
      </Center>
      <Center boxSize='full' flex='2'>
        <Text
          textAlign='center'
          fontSize={{
            base: '0.9rem',
            lg: '1.1rem',
          }}
        >
          {name}
        </Text>
      </Center>
    </VStack>
  );
};

const PaymentMethods = props => {
  return (
    <Box w='full' mt={6}>
      <Box>
        <Heading as={'h6'} fontSize='1.2rem' fontWeight='600' my={4}>
          Phương tác thanh toán
        </Heading>
        <HStack w='full' gap='1'>
          {data.map(m => {
            return <MethodBox key={m.name} {...m} {...props} />;
          })}
        </HStack>
      </Box>
    </Box>
  );
};

export default PaymentMethods;
