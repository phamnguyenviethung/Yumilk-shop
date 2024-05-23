import { logout } from '@/features/Auth/authSlice';
import { Box, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
const Home = () => {
  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(logout());
  };

  return (
    <Box>
      hello {authState?.userData?.username}
      <Button colorScheme='red' onClick={handleSubmit}>
        Logout
      </Button>
    </Box>
  );
};

export default Home;
