/* eslint-disable react/prop-types */
import PlusIcon from '@/assets/Icon/plus';
import { Box, Button, Flex, Icon, useDisclosure } from '@chakra-ui/react';
import AddressEditModal from './AddressEditModal';
const AddAddress = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w='full'>
      <Flex justifyContent='flex-end' w='full'>
        <Button
          leftIcon={<Icon as={PlusIcon} color='pink.800' />}
          variant='outline'
          colorScheme='pink'
          onClick={onOpen}
          size={{
            base: 'sm',
            lg: 'md',
          }}
        >
          Thêm mới địa chỉ
        </Button>
      </Flex>
      <AddressEditModal onClose={onClose} isOpen={isOpen} type='add' />
    </Box>
  );
};

export default AddAddress;
