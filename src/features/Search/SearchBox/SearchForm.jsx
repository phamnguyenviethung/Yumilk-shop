import { useSearchProductQuery } from '@/apis/productApi';
import SearchIcon from '@/assets/Icon/search';
import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  useOutsideClick,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useThrottle } from 'use-throttle';
import SearchHint from './SearchHint';
const SearchForm = () => {
  const [searchValue, setSearchValue] = useState(null);
  const throttledText = useThrottle(searchValue, 500);
  const ref = useRef();
  const nav = useNavigate();
  const [focus, setFocus] = useState(false);
  useOutsideClick({
    ref: ref,
    handler: () => setFocus(false),
  });
  const { data: searchData, isLoading } = useSearchProductQuery(throttledText, {
    skip: !throttledText,
  });

  return (
    <Box w='full' pos='relative' ref={ref}>
      <HStack
        as='form'
        onSubmit={() => {
          nav(`/search?keyword=${searchValue ?? ''}`);
        }}
        alignItems='center'
        gap='0'
      >
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
          to={`/search?keyword=${searchValue ?? ''}`}
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
      {searchData?.items?.length > 0 && focus && !isLoading && (
        <Box position='absolute' w='full' top='120%' zIndex={9999}>
          <SearchHint
            data={searchData}
            keyword={throttledText}
            setFocus={setFocus}
          />
        </Box>
      )}
    </Box>
  );
};

export default SearchForm;
