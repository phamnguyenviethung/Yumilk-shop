import { VStack } from '@chakra-ui/react';
import AddAddress from './AddAddress';
import AddressList from './AddressList';
import { useGetMyAddressQuery } from '@/apis/customerApi';

const Address = () => {
  const { data, isLoading } = useGetMyAddressQuery();
  if (isLoading) return <p>Loading...</p>;

  return (
    <VStack w='full'>
      {data.length < 3 && <AddAddress />}
      <AddressList data={data} />
    </VStack>
  );
};

export default Address;
