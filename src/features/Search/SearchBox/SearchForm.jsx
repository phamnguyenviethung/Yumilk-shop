import SearchIcon from '@/assets/Icon/search';
import { Box, Button, HStack, Icon, Input, VStack } from '@chakra-ui/react';
import SearchHint from './SearchHint';
import { useEffect, useState } from 'react';

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <HStack alignItems='center' gap='0'>
        <Input
          placeholder='Tìm kiếm'
          id='search'
          name='search'
          size='lg'
          border='2px solid'
          borderRadius='0'
          borderColor='pink.400'
          boxShadow='none'
          borderTopLeftRadius='10px'
          borderBottomLeftRadius='10px'
          onChange={handleChange}
          _focus={{
            outline: 0,
            borderColor: 'pink.600',
          }}
          _focusVisible={{
            borderColor: 'pink.500',
          }}
        />
        <Button
          colorScheme='pink'
          size='lg'
          borderRadius='0'
          borderTopRightRadius='10px'
          borderBottomRightRadius='10px'
        >
          <Icon as={SearchIcon} fontSize='1.6rem' fontWeight='bold' />
        </Button>
      </HStack>
      <Box position={"relative"}>
        <SearchHint keyword={searchValue} />
      </Box>

    </>
  );
};

export default SearchForm;
