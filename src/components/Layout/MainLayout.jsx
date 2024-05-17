import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Box mt='auto'>
        <Footer />
      </Box>
    </>
  );
};

export default MainLayout;
