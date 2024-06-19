/* eslint-disable react/prop-types */
import { useGetOrderDetailQuery } from '@/apis/orderApi';
import Info from '@/features/Order/OrderDetail/Info';
import ProductTable from '@/features/Order/OrderDetail/ProductTable';
import { Container, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderDetailQuery(id);
  if (isLoading) return <p>Loading.......</p>;

  return (
    <Container maxW='container.xl'>
      <VStack w='full' gap='8'>
        <Info id={id} data={data} />
        <ProductTable data={data} />
      </VStack>
    </Container>
  );
};

export default OrderDetail;
