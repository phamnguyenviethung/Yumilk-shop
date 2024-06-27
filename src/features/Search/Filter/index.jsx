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
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import BrandFilter from './BrandFilter';

const Filter = ({ setQueryStr }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterQuery, setFilterQuery] = useState({
    brandIds: [],
  });

  return (
    <>
      <Button onClick={onOpen}>Bộ lọc</Button>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size={{
          base: 'md',
          lg: 'lg',
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bộ lọc</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w='full'>
              <Box w='full'>
                <BrandFilter
                  selectedData={filterQuery.brandIds}
                  setFilterQuery={setFilterQuery}
                />
              </Box>
              <Box>category</Box>
              <Box>price</Box>
              <Box>rate</Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                setQueryStr(filterQuery);
                onClose();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Filter;
