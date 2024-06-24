import SearchIcon from '@/assets/Icon/search';
import { Box, Button, HStack, Icon, Input } from '@chakra-ui/react';
import { useState } from 'react';
import SearchHint from './SearchHint';
import { useSearchProductQuery } from '@/apis/productApi';
import { useThrottle } from 'use-throttle';

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState(null);
  const throttledText = useThrottle(searchValue, 500);

  const { data: searchData, isLoading } = useSearchProductQuery(throttledText);
  const [focus, setFocus] = useState(false);
  if (isLoading) return <p>Loading...</p>;
  return (
    <Box w='full' pos='relative'>
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
          colorScheme='pink'
          size='lg'
          borderRadius='0'
          borderTopRightRadius='10px'
          borderBottomRightRadius='10px'
        >
          <Icon as={SearchIcon} fontSize='1.6rem' fontWeight='bold' />
        </Button>
      </HStack>
      {searchData?.items?.length > 0 && focus && (
        <Box position='absolute' w='full' top='120%'>
          <SearchHint data={searchData} keyword={throttledText} />
        </Box>
      )}
    </Box>
  );
};

export default SearchForm;
