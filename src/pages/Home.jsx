import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
const Home = () => {
  const authState = useSelector(state => state.auth);
  return <Box>hello {authState.userData.username}</Box>;
};

export default Home;
