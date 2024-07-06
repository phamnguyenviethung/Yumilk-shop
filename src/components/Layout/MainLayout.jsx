import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import ActiveAlert from '../Dialog/ActiveAlert';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <ActiveAlert />
      <Outlet />
      <Box mt='auto' pt={12}>
        <Footer />
      </Box>
    </>
  );
};

export default MainLayout;
