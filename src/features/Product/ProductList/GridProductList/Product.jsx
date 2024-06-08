/* eslint-disable react/prop-types */
import { useAddToCartMutation } from '@/apis/cartApi';
import { Box, Flex, Heading, Icon, Image, Tag } from '@chakra-ui/react';
import { BsCart3 } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const Product = ({ data }) => {
  const [addToCart] = useAddToCartMutation();
  const authState = useSelector(state => state.auth);

  const handleAddtoCart = async productId => {
    try {
      const res = await addToCart({
        userID: authState?.userData?.userID,
        data: {
          productId,
          quantity: 1,
        },
      });
      if (res.error) throw res.error.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex direction='column' minH='full'>
      <Box w='full'>
        <Image w='full' alt={data.name} src='https://placehold.co/200x200' />
      </Box>
      <Flex direction='column' flex='1'>
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
          <Box cursor='pointer' onClick={() => handleAddtoCart(data.id)}>
            <Icon as={BsCart3} fontSize='1.6rem' />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Product;
