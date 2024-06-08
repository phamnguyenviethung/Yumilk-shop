import logo from '@/assets/logo.png';
import CartNavbarIcon from '@/features/Cart/CartNavbarIcon';
import SearchForm from '@/features/Search/SearchBox/SearchForm';
import {
  Box,
  Center,
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
import { BsCart3, BsPerson } from 'react-icons/bs';
import data from './data';

const Navbar = () => {
  return (
    <Container maxW='container.xl' maxH='150px'>
      <HStack w='full' maxH='full'>
        <Box flex='1' justifyContent='flex-start'>
          <Image src={logo} boxSize='180px' objectFit='cover'></Image>
        </Box>
        <Box flex='4'>
          <SearchForm />
        </Box>
        <Flex alignItems='center' gap='3' flex='1' justifyContent='flex-end'>
          <Box pos='relative'>
            <Center p='3' bgColor='pink.100' borderRadius='100%'>
              <Icon as={BsCart3} fontSize='1.2rem' />
            </Center>
            <CartNavbarIcon />
          </Box>
          <Box>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={
                  <Center p='3' bgColor='pink.100' borderRadius='100%'>
                    <Icon as={BsPerson} fontSize='1.2rem' />
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
