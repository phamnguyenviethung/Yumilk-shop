/* eslint-disable react/prop-types */
import PlusIcon from '@/assets/Icon/plus';
import { Button, Flex, Icon, useDisclosure } from '@chakra-ui/react';
import AddressEditModal from './AddressEditModal';
const AddAddress = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex justifyContent='flex-end' w='full'>
        <Button
          leftIcon={<Icon as={PlusIcon} color='pink.800' />}
          variant='outline'
          colorScheme='pink'
          onClick={onOpen}
        >
          Thêm mới địa chỉ
        </Button>
      </Flex>
      <AddressEditModal onClose={onClose} isOpen={isOpen} type='add' />
    </>
  );
};

export default AddAddress;
