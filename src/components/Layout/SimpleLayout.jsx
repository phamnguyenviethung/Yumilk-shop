import { Outlet } from 'react-router-dom';
import { Center, Image } from '@chakra-ui/react';
import logo from '@/assets/logo.png';
const SimpleLayout = () => {
  return (
    <>
      <Center h='100px' mb={4}>
        <Center h='full'>
          <Image w='200px' src={logo} />
        </Center>
      </Center>
      <Outlet />
    </>
  );
};

export default SimpleLayout;
