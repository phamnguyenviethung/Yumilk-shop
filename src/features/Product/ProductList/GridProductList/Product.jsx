/* eslint-disable react/prop-types */
import { Box, Flex, Heading, Image, Tag } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Product = ({ data }) => {
  return (
    <Flex
      to={`/product/${data.id}`}
      as={Link}
      direction='column'
      minH='full'
      userSelect='none'
    >
      <Box w='full' flex='1'>
        <Image
          w='full'
          h='full'
          alt={data.name}
          src={data.thumbnail}
          fallbackSrc='https://placehold.co/200x200'
        />
      </Box>
      <Flex direction='column'>
        <Box
          flex='1'
          sx={{
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            display: '-webkit-box',
          }}
        >
          {data.name}
        </Box>
        <Flex justifyContent='space-between' my={2} alignItems='center'>
          <Flex gap='2'>
            <Heading as='h2' fontSize='xl' fontWeight='600'>
              {data.salePrice ? data.salePrice : data.originalPrice}
            </Heading>
            {data.salePrice && (
              <Tag colorScheme='pink'>
                -{' '}
                {Number.parseInt(
                  100 - (data.salePrice * 100) / data.originalPrice
                )}
                %
              </Tag>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Product;
