/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';

function AddressModal({
  isOpen,
  onClose,
  addressList,
  handleSelect,
  addressSelected,
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size='2xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chọn địa chỉ</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={8}>
            <VStack w='full' gap={4}>
              {addressList.map((item, index) => {
                return (
                  <Box
                    key={item.id}
                    onClick={() => handleSelect(index)}
                    w='full'
                    p={4}
                    border='2px double'
                    borderColor={
                      addressSelected.id === addressList[index].id
                        ? 'pink.400'
                        : 'gray.500'
                    }
                    borderRadius='6px'
                    _hover={{
                      borderColor: 'pink.400',
                    }}
                    minH='120px'
                    cursor='pointer'
                  >
                    {item.isDefault && (
                      <Tag mb={2} colorScheme='pink' size='sm'>
                        Địa chỉ mặc định
                      </Tag>
                    )}
                    <Text fontWeight='600' fontSize='1rem'>
                      {item.receiverName} | {item.receiverPhone}
                    </Text>
                    <Text
                      mt={2}
                      color='gray.500'
                      fontSize='0.95rem'
                      fontWeight='500'
                    >
                      {item.address} {item.wardName} {item.districtName}{' '}
                      {item.provinceName}
                    </Text>
                  </Box>
                );
              })}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme='pink'>
              Xác nhận
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const AddressSelect = ({
  addressSelected,
  addressList,
  isOpen,
  onClose,
  handleSelect,
}) => {
  return (
    <>
      <Box w='full' my={4}>
        <Box>
          {addressSelected.isDefault && (
            <Tag mb={2} colorScheme='pink' size='sm'>
              Địa chỉ mặc định
            </Tag>
          )}
          <Text>
            {addressSelected.receiverName} | {addressSelected.receiverPhone}
          </Text>
          <Text mt={2} color='gray.500' fontSize='0.95rem' fontWeight='500'>
            {addressSelected.address} {addressSelected.wardName}{' '}
            {addressSelected.districtName} {addressSelected.provinceName}
          </Text>
        </Box>
      </Box>
      <AddressModal
        isOpen={isOpen}
        onClose={onClose}
        addressList={addressList}
        handleSelect={handleSelect}
        addressSelected={addressSelected}
      />
    </>
  );
};

export default AddressSelect;
