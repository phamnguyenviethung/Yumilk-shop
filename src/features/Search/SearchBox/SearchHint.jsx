/* eslint-disable react/prop-types */
import { Box, Highlight, List, ListItem } from '@chakra-ui/react';

const SearchHint = ({ data, keyword }) => {
  if (!keyword) return <></>;

  return (
    <Box
      w='full'
      borderRadius='10px'
      bgColor='white'
      border='0.5px solid'
      borderColor='gray.100'
      boxShadow='rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px'
    >
      <List>
        {data?.items.map(item => (
          <ListItem
            cursor='pointer'
            py={4}
            px={2}
            key={item.name}
            _hover={{
              bgColor: 'gray.200',
            }}
          >
            <Highlight query={keyword} styles={{ fontWeight: 'bold' }}>
              {item.name}
            </Highlight>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchHint;
