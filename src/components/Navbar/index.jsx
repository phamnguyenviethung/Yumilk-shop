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
  Tag,
  useTheme,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import data, { noAuthData } from './data';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoginIcon from '@/assets/Icon/login';
import numeral from 'numeral';

const Navbar = () => {
  const [userMenu, setUserMenu] = useState(data);
  const authState = useSelector(state => state.auth);
  const theme = useTheme();
  useEffect(() => {
    setUserMenu(authState?.isAuthenticated ? data : noAuthData);
  }, [setUserMenu, authState?.isAuthenticated]);

  return (
    <Container maxW='container.xl' maxH={theme.navbarHeight} mb={2}>
      <HStack w='full' maxH='full'>
        <ChakraLink flex='1' justifyContent='flex-start' as={Link} to='/'>
          <Image src={logo} boxSize='180px' objectFit='cover'></Image>
        </ChakraLink>

        <Box
          display={{
            base: 'none',
            lg: 'block',
          }}
          w='full'
          flex='4'
        >
          <SearchForm />
        </Box>
        <Flex alignItems='center' gap='3' flex='1' justifyContent='flex-end'>
          <Link to={authState?.isAuthenticated ? '/cart' : '/login'}>
            {authState?.isAuthenticated ? (
              <CartNavbarIcon />
            ) : (
              <Icon as={LoginIcon} fontSize='1.2rem' />
            )}
          </Link>

          <Box zIndex={999}>
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
                {userMenu.map(item => {
                  if (item.handleClick) {
                    return (
                      <MenuItem key={item.name} onClick={item.handleClick}>
                        {item.name}
                      </MenuItem>
                    );
                  }

                  return (
                    <Link key={item.name} to={item.path}>
                      <MenuItem>{item.name}</MenuItem>
                    </Link>
                  );
                })}
              </MenuList>
            </Menu>
          </Box>
          {authState?.isAuthenticated && (
            <Tag size='md' colorScheme='pink'>
              {numeral(authState?.userData?.point).format('0,0')} xu
            </Tag>
          )}
        </Flex>
      </HStack>
    </Container>
  );
};

export default Navbar;
