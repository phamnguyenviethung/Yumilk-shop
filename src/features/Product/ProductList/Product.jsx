/* eslint-disable react/prop-types */
import formatMoney from '@/utils/formatMoney';
import {
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { PiStarFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const Product = ({ data }) => {
  return (
    <Flex
      to={`/product/${data.id}`}
      as={Link}
      direction='column'
      minH='400px'
      userSelect='none'
      border='0.3px solid'
      borderColor='gray.200'
      p={1}
      _hover={{
        bgColor: 'gray.100',
      }}
      borderRadius='10'
    >
      <Center flex='1' boxSize='full' pos='relative'>
        <Image
          boxSize='full'
          alt={data.name}
          src={data.thumbnail}
          fallbackSrc='https://placehold.co/200x200'
          objectFit='none'
        />
        <VStack pos='absolute' top='1' right='1'>
          {data.salePrice > 0 && (
            <Tag colorScheme='red' variant='solid'>
              Hot
            </Tag>
          )}
          {data.orderCount > 3 && (
            <Tag colorScheme='blue' variant='solid'>
              Bán chạy
            </Tag>
          )}
        </VStack>
      </Center>
      <Flex w direction='column' flex='1' justifyContent='space-between'>
        <Box
          flex='1'
          fontSize={{
            base: '0.85rem',
            lg: '0.9rem',
          }}
          textAlign='left'
        >
          <Text
            sx={{
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              display: '-webkit-box',
            }}
          >
            {' '}
            {data.name}
          </Text>
          <HStack w='full' gap='1' my={1}>
            <Icon as={PiStarFill} color='yellow.500' />
            <Icon as={PiStarFill} color='yellow.500' />
            <Icon as={PiStarFill} color='yellow.500' />
            <Icon as={PiStarFill} color='yellow.500' />
            <Icon as={PiStarFill} color='yellow.500' />
          </HStack>
          <Text fontSize='0.85rem'>Đã bán {data.orderCount}</Text>
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

            <Flex justifyContent='space-between' w='full' alignItems='center'>
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
            </Flex>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Product;
