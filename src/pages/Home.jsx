import { useGetSellingProductQuery } from '@/apis/productApi';
import { logout } from '@/features/Auth/authSlice';
import GridProductList from '@/features/Product/ProductList/GridProductList';
import { Box, Button, Container } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
const Home = () => {
  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetSellingProductQuery();

  const handleSubmit = () => {
    dispatch(logout());
  };
  if (isLoading) return <p>loading..........!</p>;

  return (
    <Container maxW='container.xl'>
      hello {authState?.userData?.username}
      <Button colorScheme='red' onClick={handleSubmit}>
        Logout
      </Button>
      <Box>
        <GridProductList data={data} />
      </Box>
    </Container>
  );
};

export default Home;
