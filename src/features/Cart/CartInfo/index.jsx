import { useGetMyAddressQuery } from '@/apis/customerApi';
import { Button, HStack, Text, VStack, useDisclosure } from '@chakra-ui/react';
import AddressSelect from './AddressSelect';
import { useState } from 'react';
import Fee from './Fee';

const CartInfo = () => {
  const { data, isLoading } = useGetMyAddressQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectIndex, setSelectIndex] = useState(0);

  const handleSelect = n => {
    setSelectIndex(n);
  };

  if (isLoading) return <p>loading</p>;
  return (
    <VStack flex='1' w='full' gap='4'>
      <HStack justify='space-between' w='full' fontWeight='500'>
        <Text color='gray.500' userSelect='none'>
          Giao tới
        </Text>
        <Text color='pink.400' cursor='pointer' onClick={onOpen}>
          Thay đổi
        </Text>
      </HStack>
      <AddressSelect
        addressSelected={data[selectIndex]}
        addressList={data}
        isOpen={isOpen}
        onClose={onClose}
        handleSelect={handleSelect}
      />
      <Fee addressSelected={data[selectIndex]} />
      <Button w='full' colorScheme='pink' mt={2}>
        Mua ngay
      </Button>
    </VStack>
  );
};

export default CartInfo;
