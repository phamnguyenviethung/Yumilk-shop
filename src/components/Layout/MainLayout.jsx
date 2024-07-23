import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Box, Center, Text } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import ActiveAlert from '../Dialog/ActiveAlert';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <ActiveAlert />
      <Outlet />
      <Center
        w='full'
        bgColor='yellow.100'
        textAlign='center'
        minH='60px'
        fontWeight='500'
        fontFamily="'Paytone One', sans-serif"
      >
        <Text
          fontSize={{
            base: '1rem',
            lg: '1.15rem',
          }}
        >
          Hotline:{' '}
          <Text
            mx={2}
            as='span'
            fontWeight='400'
            color='pink.400'
            fontSize={{
              base: '1.2rem',
              lg: '1.3rem',
            }}
          >
            1900 1515
          </Text>
          <Text as='span'>/ 8h - 17h T2 - T7</Text>
        </Text>
      </Center>
      <Box mt='auto' pt={12}>
        <Footer />
      </Box>
    </>
  );
};

export default MainLayout;
