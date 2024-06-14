import { Link, Outlet } from 'react-router-dom';
import { Center, Image } from '@chakra-ui/react';
import logo from '@/assets/logo.png';
const SimpleLayout = () => {
  return (
    <>
      <Center h='100px' mb={4}>
        <Center h='full'>
          <Link to='/'>
            <Image w='200px' src={logo} />
          </Link>
        </Center>
      </Center>
      <Outlet />
    </>
  );
};

export default SimpleLayout;
