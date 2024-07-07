/* eslint-disable react/prop-types */
import { useGetAllReviewsQuery } from '@/apis/productApi';
import formatMoney from '@/utils/formatMoney';
import { Box, Heading, HStack, Image, Td, Tr } from '@chakra-ui/react';
import RatingButton from '../RatingButton';

const ProductRow = ({ product, orderId, isDelivered }) => {
  const { data, isLoading } = useGetAllReviewsQuery({
    orderId,
    productId: product.productId,
  });
  if (isLoading) return <p>Loading...</p>;
  return (
    <Tr key={product.productId}>
      <Td>
        <HStack>
          <Box
            boxSize={{
              base: '80px',
              lg: '100px',
            }}
          >
            <Image
              boxSize='full'
              src={product.thumbnail}
              fallbackSrc='https://placehold.co/100'
              borderRadius='4px'
            />
          </Box>
          <Heading as='h6' fontSize='1rem' fontWeight='600'>
            {product.productName}
          </Heading>
        </HStack>
      </Td>
      <Td isNumeric>{product.quantity}</Td>
      <Td isNumeric>{formatMoney(product.unitPrice)}</Td>
      <Td isNumeric color='pink.400' fontWeight='600' fontSize='1.2rem'>
        {formatMoney(product.itemPrice)}
      </Td>
      {isDelivered && (
        <Td isNumeric>
          <RatingButton
            productId={product.productId}
            orderId={orderId}
            productName={product.productName}
            data={data?.items.find(p => p.productId === product.productId)}
          />
        </Td>
      )}
    </Tr>
  );
};

export default ProductRow;
