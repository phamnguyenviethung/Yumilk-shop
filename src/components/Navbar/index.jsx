import UserIcon from '@/assets/Icon/user';
import logo from '@/assets/logo.png';
import CartNavbarIcon from '@/features/Cart/CartNavbarIcon';
import SearchForm from '@/features/Search/SearchBox/SearchForm';
import {
  Box,
  Center,
  Link as ChakraLink,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import data from './data';

const Navbar = () => {
  return (
    <Container maxW='container.xl' maxH='150px'>
      <HStack w='full' maxH='full'>
        <ChakraLink flex='1' justifyContent='flex-start' as={Link} to='/'>
          <Image src={logo} boxSize='180px' objectFit='cover'></Image>
        </ChakraLink>
        <Box flex='4'>
          <SearchForm />
        </Box>
        <Flex alignItems='center' gap='3' flex='1' justifyContent='flex-end'>
          <Link to='/cart'>
            <CartNavbarIcon />
          </Link>
          <Box>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                border='0'
                icon={
                  <Center p='3' borderRadius='100%'>
                    <Icon as={UserIcon} fontSize='1.2rem' />
                  </Center>
                }
                variant='outline'
              />
              <MenuList>
                {data.map(item => {
                  return <MenuItem key={item.name}>{item.name}</MenuItem>;
                })}
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </HStack>
    </Container>
  );
};

export default Navbar;
