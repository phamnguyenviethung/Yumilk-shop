/* eslint-disable react/prop-types */
import { Box, Flex, Tag, Text, VStack, useDisclosure } from '@chakra-ui/react';
import AddressEditModal from './AddressEditModal';

const Address = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        w='full'
        fontSize='1.1rem'
        p={4}
        border='1px solid'
        borderColor={data.isDefault ? 'pink.400' : 'gray.300'}
        borderRadius='8px'
        minH='120px'
        _hover={{
          borderColor: 'pink.400',
        }}
      >
        <Flex>
          <Box flex='1'>
            {data.isDefault && (
              <Tag mb={2} colorScheme='pink'>
                Địa chỉ mặc định
              </Tag>
            )}
            <Text fontWeight='bold'>{data.receiverName}</Text>
            <Text>{data.receiverPhone}</Text>
            <Text
              mt={4}
            >{`${data.address} ${data.wardName} ${data.districtName} ${data.provinceName}`}</Text>
          </Box>
          <Box>
            <Text color='pink.500' fontSize='1rem' onClick={onOpen}>
              Chỉnh sửa
            </Text>
          </Box>
        </Flex>
      </Box>
      <AddressEditModal
        onClose={onClose}
        isOpen={isOpen}
        type='update'
        addressData={data}
      />
    </>
  );
};

const AddressList = ({ data }) => {
  return (
    <VStack w='full'>
      {data.map(item => {
        return <Address key={item.id} data={item} />;
      })}
    </VStack>
  );
};

export default AddressList;
