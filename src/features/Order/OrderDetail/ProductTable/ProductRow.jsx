/* eslint-disable react/prop-types */
import formatMoney from '@/utils/formatMoney';
import { Box, HStack, Image, Td, Text, Tr } from '@chakra-ui/react';
import RatingButton from '../RatingButton';

const ProductRow = ({ product, orderId }) => {
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
          <Text fontWeight='600'>{product.productName}</Text>
        </HStack>
      </Td>
      <Td isNumeric>{product.quantity}</Td>
      <Td isNumeric>{formatMoney(product.unitPrice)}</Td>
      <Td isNumeric color='pink.400' fontWeight='600' fontSize='1.2rem'>
        {formatMoney(product.itemPrice)}
      </Td>
      <Td isNumeric>
        <RatingButton
          productId={product.productId}
          orderId={orderId}
          productName={product.productName}
        />
      </Td>
    </Tr>
  );
};

export default ProductRow;
