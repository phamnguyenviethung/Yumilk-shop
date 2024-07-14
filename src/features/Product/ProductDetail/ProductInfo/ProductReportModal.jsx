/* eslint-disable react/prop-types */
import { useGetReportTypesQuery, useSendReportMutation } from '@/apis/report';
import Loading from '@/components/Loading';
import {
  Box,
  Button,
  Center,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { TbFlag } from 'react-icons/tb';

function ProductReportModal({ productId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedID, setSelectedID] = useState(null);
  const { data, isLoading } = useGetReportTypesQuery();
  const [sendReportAPI, { isLoading: reportLoading }] = useSendReportMutation();
  const toast = useToast();
  if (isLoading)
    return (
      <Center boxSize='full'>
        <Loading />
      </Center>
    );
  const handleSubmit = async () => {
    try {
      const res = await sendReportAPI({
        productId,
        reportTypeId: selectedID,
      });
      if (res.error) throw res.error.data;
      toast({
        title: 'Báo cáo thành công',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: error.message,
        status: 'error',
        duration: 2500,
        isClosable: true,
        position: 'top-right',
      });
    }
  };
  return (
    <>
      <Icon
        onClick={onOpen}
        as={TbFlag}
        fontSize='1.5rem'
        color='gray.500'
        cursor='pointer'
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Báo cáo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w='full' spacing={2}>
              {data.items.map(r => {
                return (
                  <Box
                    key={r.id}
                    onClick={() => setSelectedID(r.id)}
                    px={4}
                    py={2}
                    borderStyle='solid'
                    borderWidth={selectedID === r.id ? '2px' : '1px'}
                    borderColor={selectedID === r.id ? 'pink.400' : 'gray.500'}
                    borderRadius={32}
                    cursor='pointer'
                  >
                    {r.name}
                  </Box>
                );
              })}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              variant='ghost'
              colorScheme='red'
              mr={3}
              onClick={onClose}
              isLoading={isLoading || reportLoading}
            >
              Đóng
            </Button>
            <Button
              onClick={handleSubmit}
              colorScheme='pink'
              isDisabled={!selectedID}
              isLoading={isLoading || reportLoading}
            >
              Báo cáo
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default ProductReportModal;
