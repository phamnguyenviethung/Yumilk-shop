/* eslint-disable react/prop-types */
import FilterIcon from '@/assets/Icon/filter';
import {
  Box,
  Button,
  Heading,
  Icon,
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
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';

const Filter = ({ setQueryStr }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterQuery, setFilterQuery] = useState({
    brandIds: [],
    categoryIds: [],
    minPrice: 0,
    maxPrice: 1000000,
  });

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme='pink'
        variant='outline'
        leftIcon={<Icon as={FilterIcon} />}
      >
        Bộ lọc
      </Button>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size={{
          base: 'md',
          lg: 'lg',
        }}
        scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bộ lọc</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w='full' spacing={2}>
              <Box w='full'>
                <Heading as='h4' fontSize='0.9rem' my={4} fontWeight={600}>
                  Nhãn hàng
                </Heading>
                <BrandFilter
                  selectedData={filterQuery.brandIds}
                  setFilterQuery={setFilterQuery}
                />
              </Box>
              <Box w='full'>
                <Heading as='h4' fontSize='0.9rem' my={4} fontWeight={600}>
                  Danh mục
                </Heading>
                <CategoryFilter
                  selectedData={filterQuery.categoryIds}
                  setFilterQuery={setFilterQuery}
                />
              </Box>
              <Box w='full'>
                <Heading as='h4' fontSize='0.9rem' my={4} fontWeight={600}>
                  Giá tiền
                </Heading>
                <PriceFilter
                  min={filterQuery.minPrice}
                  max={filterQuery.maxPrice}
                  setFilterQuery={setFilterQuery}
                />
              </Box>
              <Box>rate</Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='pink'
              onClick={() => {
                setQueryStr(filterQuery);
                onClose();
              }}
            >
              Xác nhận
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Filter;
