/* eslint-disable react/prop-types */
import { SimpleGrid } from '@chakra-ui/react';
import Product from './Product';

const GridProductList = ({ data }) => {
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
      {data.items.map(product => {
        return <Product key={product.id} data={product} />;
      })}
    </SimpleGrid>
  );
};

export default GridProductList;
