/* eslint-disable react/prop-types */
import { useGetOrderDetailQuery } from '@/apis/orderApi';
import Loading from '@/components/Loading';
import Info from '@/features/Order/OrderDetail/Info';
import OrderLog from '@/features/Order/OrderDetail/OrderLog';
import ProductTable from '@/features/Order/OrderDetail/ProductTable';
import { Center, Container, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();
  const authState = useSelector(state => state.auth);

  const { data, isLoading, isError } = useGetOrderDetailQuery({
    id,
    userID: authState?.userData?.userID,
  });
  if (isLoading) {
    return (
      <Center boxSize='full'>
        <Loading />
      </Center>
    );
  }
  if (isError)
    return (
      <Center w='full' h='500px'>
        Không tìm thấy dữ liệu
      </Center>
    );

  return (
    <Container maxW='container.xl'>
      <VStack w='full' gap='8'>
        <Info id={id} data={data} />
        <ProductTable data={data} orderId={id} />
      </VStack>
      <OrderLog data={data} />
    </Container>
  );
};

export default OrderDetail;
