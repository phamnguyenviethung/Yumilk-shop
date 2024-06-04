import { Box, Container, HStack, Image } from '@chakra-ui/react';
import logo from '@/assets/logo.png';
import SearchForm from '@/features/Search/SearchBox/SearchForm';
const Navbar = () => {
  return (
    <Container maxW='container.xl' maxH='200px'>
      <HStack maxH='full'>
        <Box flex='1'>
          <Image src={logo} boxSize='180px' objectFit='cover'></Image>
        </Box>
        <Box flex='4'>
          <SearchForm />
        </Box>
        <Box flex='1'>cart</Box>
      </HStack>
    </Container>
  );
};

export default Navbar;
