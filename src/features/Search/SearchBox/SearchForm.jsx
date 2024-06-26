import SearchIcon from '@/assets/Icon/search';
import { Box, Button, HStack, Icon, Input } from '@chakra-ui/react';
import { useState } from 'react';
import SearchHint from './SearchHint';
import { useSearchProductQuery } from '@/apis/productApi';
import { useThrottle } from 'use-throttle';
import { Link } from 'react-router-dom';

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState(null);
  const throttledText = useThrottle(searchValue, 500);

  const { data: searchData, isLoading } = useSearchProductQuery(throttledText, {
    skip: !throttledText,
  });
  const [focus, setFocus] = useState(false);
  return (
    <Box w='full' pos='relative'>
      <HStack as='form' alignItems='center' gap='0'>
        <Input
          placeholder='Tìm kiếm'
          size='lg'
          name='keyword'
          autoComplete='off'
          border='2px solid'
          borderRadius='0'
          borderColor='pink.400'
          boxShadow='none'
          borderTopLeftRadius='10px'
          borderBottomLeftRadius='10px'
          onChange={e => setSearchValue(e.target.value.trim())}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          _focus={{
            outline: 0,
            borderColor: 'pink.600',
          }}
          _focusVisible={{
            borderColor: 'pink.500',
          }}
        />
        <Button
          type='submit'
          to={`/search?keyword=${searchValue}`}
          as={Link}
          colorScheme='pink'
          size='lg'
          borderRadius='0'
          borderTopRightRadius='10px'
          borderBottomRightRadius='10px'
        >
          <Icon as={SearchIcon} fontSize='1.6rem' fontWeight='bold' />
        </Button>
      </HStack>
      {searchData?.items?.length > 0 && focus && isLoading && (
        <Box position='absolute' w='full' top='120%' zIndex={99}>
          <SearchHint data={searchData} keyword={throttledText} />
        </Box>
      )}
    </Box>
  );
};

export default SearchForm;
