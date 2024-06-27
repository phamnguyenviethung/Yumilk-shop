/* eslint-disable react/prop-types */
import formatMoney from '@/utils/formatMoney';
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Product = ({ data }) => {
  return (
    <Flex
      to={`/product/${data.id}`}
      as={Link}
      direction='column'
      minH='250px'
      userSelect='none'
      border='0.3px solid'
      borderColor='gray.200'
      p={1}
      _hover={{
        bgColor: 'gray.100',
      }}
      borderRadius='10'
    >
      <Center flex='1' boxSize='full'>
        <Image
          boxSize='full'
          alt={data.name}
          src={data.thumbnail}
          fallbackSrc='https://placehold.co/200x200'
          objectFit='none'
        />
      </Center>
      <Flex direction='column' flex='1' justifyContent='space-between'>
        <Box
          as='h2'
          flex='1'
          fontSize={{
            base: '0.85rem',
            lg: '0.9rem',
          }}
          sx={{
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            display: '-webkit-box',
          }}
          textAlign='left'
        >
          <Text> {data.name}</Text>
        </Box>
        <Flex justifyContent='space-between' my={2} alignItems='center'>
          <VStack w='full'>
            <Flex gap='2' w='full'>
              <Heading
                as='p'
                fontSize={{
                  base: '1rem',
                  lg: '1.1rem',
                }}
                fontWeight='600'
                color={data.salePrice === 0 ? 'inherit' : 'pink.400'}
              >
                {formatMoney(
                  data.salePrice ? data.salePrice : data.originalPrice
                )}
              </Heading>
              {data.salePrice > 0 && (
                <Tag
                  colorScheme='pink'
                  size={{
                    base: 'sm',
                    lg: 'md',
                  }}
                >
                  -{' '}
                  {Number.parseInt(
                    100 - (data.salePrice * 100) / data.originalPrice
                  )}
                  %
                </Tag>
              )}
            </Flex>

            <Box w='full'>
              <Heading
                as='s'
                fontSize={{
                  base: '1rem',
                  lg: '1.1rem',
                }}
                fontWeight='400'
                color='gray.500'
              >
                {data.salePrice === 0 ? '' : formatMoney(data.originalPrice)}
              </Heading>
            </Box>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Product;
