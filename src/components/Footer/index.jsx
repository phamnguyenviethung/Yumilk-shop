/* eslint-disable react/prop-types */
import logo from '@/assets/logo.png';
import {
  Box,
  Container,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
const Logo = () => {
  return <Image src={logo} boxSize={[120, 150]} />;
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithLogoCentered() {
  return (
    <Box bg={'gray.50'} color={'gray.700'}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Danh mục</ListHeader>
            <Box as='a' href={'#'}>
              Sữa cho bé
            </Box>
            <Stack direction={'row'} align={'center'} spacing={2}>
              <Box as='a' href={'#'}>
                Sữa cho mẹ
              </Box>
            </Stack>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Nhãn hàng</ListHeader>
            <Box as='a' href={'#'}>
              Similac
            </Box>
            <Box as='a' href={'#'}>
              YokoGold
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Đơn vị vận chuyển</ListHeader>
            <Box>
              <Image src='https://theme.hstatic.net/200000472237/1001083717/14/logo.png?v=592' />
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Đơn vị thanh toán</ListHeader>
            <Box>
              <Image
                src='https://payos.vn/wp-content/uploads/sites/13/2023/07/payos-logo.svg'
                maxWidth='150px'
              />
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Logo />
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © 2024 Yumilk Shop
        </Text>
      </Box>
    </Box>
  );
}
