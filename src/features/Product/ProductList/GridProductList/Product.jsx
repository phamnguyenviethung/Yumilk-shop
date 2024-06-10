/* eslint-disable react/prop-types */
import { useAddToCartMutation } from '@/apis/cartApi';
import AddToCartIcon from '@/assets/Icon/addtocart';
import { addToCart } from '@/features/Cart/cartSlice';
import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Tag,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

const Product = ({ data }) => {
  const [addToCartAPI] = useAddToCartMutation();
  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  const handleAddtoCart = async productData => {
    try {
      dispatch(addToCart(productData));

      const res = await addToCartAPI({
        userID: authState?.userData?.userID,
        data: {
          productId: productData.productID,
          quantity: 1,
        },
      });
      if (res.error) throw res.error.data;
      toast({
        title: 'Đã thêm vào giỏ hàng',
        status: 'success',
        duration: 800,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex direction='column' minH='full' userSelect='none'>
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
          <Box
            cursor='pointer'
            onClick={() =>
              handleAddtoCart({
                productID: data.id,
                productName: data.name,
                quantity: 1,
                originalPrice: data.originalPrice,
                salePrice: data.salePrice,
                thumbnail: data.thumbnail,
              })
            }
          >
            <Icon as={AddToCartIcon} fontSize='1.6rem' />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Product;
