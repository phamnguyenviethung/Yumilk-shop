import { VStack } from '@chakra-ui/react';
import AddAddress from './AddAddress';
import AddressList from './AddressList';
import { useGetMyAddressQuery } from '@/apis/customerApi';
import { useSelector } from 'react-redux';

const Address = () => {
  const authState = useSelector(state => state.auth);
  const { data, isLoading } = useGetMyAddressQuery(authState, {
    refetchOnMountOrArgChange: true,
  });
  if (isLoading) return <p>Loading...</p>;

  return (
    <VStack w='full'>
      {data.length < 3 && <AddAddress />}
      <AddressList data={data} />
    </VStack>
  );
};

export default Address;
