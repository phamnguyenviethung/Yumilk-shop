/* eslint-disable react/prop-types */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Tag,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import AddressEditModal from './AddressEditModal';
import { useRef } from 'react';
import { useDeleteMyAddressMutation } from '@/apis/customerApi';

function DeleteDialog({ deleteDisclosure, addressID }) {
  const { isOpen, onClose } = deleteDisclosure;
  const cancelRef = useRef();
  const [deleteAddressAPI] = useDeleteMyAddressMutation();
  const toast = useToast();

  const handleClick = async () => {
    try {
      const res = await deleteAddressAPI(addressID);
      if (res.error) throw res.error.data;
      toast({
        title: 'Xoá thành công',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
      console.log(error);
    }
  };

  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Xoá địa chỉ</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Bạn có muốn xoá địa chỉ này không ?</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Huỷ
            </Button>
            <Button colorScheme='pink' ml={3} onClick={handleClick}>
              Xác nhận
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

const Address = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteDisclosure = useDisclosure();

  return (
    <>
      <Box
        w='full'
        fontSize={{
          base: '1rem',
          lg: '1.1rem',
        }}
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
          <Box
            textAlign='center'
            fontSize={{
              base: '0.9rem',
              lg: '1rem',
            }}
          >
            <Text
              color='pink.500'
              display={!data.isDefault ? 'block' : 'none'}
              onClick={onOpen}
              cursor='pointer'
            >
              Đặt làm mặc định
            </Text>
            <Text
              color={data.isDefault ? 'pink.500' : 'gray.500'}
              onClick={onOpen}
              cursor='pointer'
            >
              Chỉnh sửa
            </Text>

            <Text
              color='gray.500'
              display={data.isDefault ? 'block' : 'none'}
              mt={2}
              cursor='pointer'
              onClick={deleteDisclosure.onOpen}
            >
              Xoá
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
      <DeleteDialog deleteDisclosure={deleteDisclosure} addressID={data.id} />
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
