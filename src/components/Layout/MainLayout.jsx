import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
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
