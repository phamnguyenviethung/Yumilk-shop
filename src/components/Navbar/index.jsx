import { Box, Container, HStack, Image } from '@chakra-ui/react';
import logo from '@/assets/logo.png';
const Navbar = () => {
  return (
    <Container maxW='container.xl' maxH='200px'>
      <HStack maxH='full'>
        <Box>
          <Image src={logo} boxSize='180px' objectFit='cover'></Image>
        </Box>
        <Box>search</Box>
        <Box>cart</Box>
      </HStack>
    </Container>
  );
};

export default Navbar;
