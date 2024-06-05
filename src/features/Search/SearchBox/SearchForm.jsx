import InputField from '@/components/Fields/Input';
import { Button, HStack, Icon } from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import { FiSearch } from 'react-icons/fi';

const SearchForm = () => {
  return (
    <Formik initialValues={{ search: '' }}>
      {() => {
        return (
          <Form>
            <HStack alignItems='center' gap='0'>
              <FastField
                component={InputField}
                placeholder='Tìm kiếm'
                name='search'
                size='lg'
                border='2px solid'
                borderRadius='0'
                borderTopLeftRadius='10px'
                borderBottomLeftRadius='10px'
              />
              <Button
                colorScheme='pink'
                size='lg'
                borderRadius='0'
                borderTopRightRadius='10px'
                borderBottomRightRadius='10px'
              >
                <Icon as={FiSearch} fontSize='1.6rem' fontWeight='bold' />
              </Button>
            </HStack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SearchForm;
