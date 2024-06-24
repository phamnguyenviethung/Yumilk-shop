import { Box, Icon, Stack, Text, Link, VStack, HStack, Divider, Grid, GridItem, Flex, Spacer, Image, Heading } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from '@/assets/logo.png';
import { IoLocationOutline } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { MdOutlineAlternateEmail } from "react-icons/md";

const Footer = () => {
  return (
    <Box as="footer"
      borderTop="1px solid"
      borderColor="gray.300"
      py="2.5rem"
      fontSize="0.875rem">
      <Box maxW="64rem"
        marginX="auto"
        pb="2rem"
        mb="1.5rem"
        px={10}
        borderBottom="1px solid"
        borderColor="gray.300">
        <Flex flexWrap={'wrap'} alignItems={'start'} justifyContent={'space-between'}>
          <Box w={{ base: '100%', sm: '50%', md: 'max-content' }} mb={{ base: '1.5rem', lg: '0' }}>
            <Image src={logo} boxSize='100px'></Image>
            <Stack>
              <Text>"Cửa hàng sữa cho mẹ bầu và em bé"</Text>
              <HStack>
                <Icon as={IoLocationOutline} />
                <Text fontWeight={'bold'}>Địa chỉ:</Text>
                <Text>Thành phố Hồ Chí Minh</Text>
              </HStack>
              <HStack>
                <Icon as={MdLocalPhone} />
                <Text fontWeight={'bold'}>Liên hệ:</Text>
                <Text>0123456789</Text>
              </HStack>
              <HStack>
                <Icon as={MdOutlineAlternateEmail} />
                <Text fontWeight={'bold'}>Email:</Text>
                <Text>yumilk@gmail.com</Text>
              </HStack>
            </Stack>
          </Box>
          <Box w={{ base: '100%', sm: '50%', md: 'max-content' }} mb={{ base: '1.5rem', lg: '0' }}>
            <Heading color="gray.700" mb="0.5rem" fontSize="0.875rem" fontWeight="600">
              Về chúng tôi
            </Heading>
            <Stack>
              <Link>Trang chủ</Link>
              <Link>Giới thiệu</Link>
              <Link>Liên hệ</Link>
              <Link>Dịch vụ</Link>
            </Stack>
          </Box>
          <Box w={{ base: '100%', sm: '50%', md: 'max-content' }} mb={{ base: '1.5rem', lg: '0' }}>
            <Heading color="gray.700" mb="0.5rem" fontSize="0.875rem" fontWeight="600">
              Hỗ trợ khách hàng
            </Heading>
            <Stack>
              <Link>Tra cứu hoá đơn</Link>
              <Link>Hình thức thanh toán</Link>
            </Stack>
          </Box>
        </Flex>
      </Box>
      <Flex maxW="64rem" mx="auto" alignItems="center" px={10}>
        <Text color="gray.600" fontSize="0.875rem" pl="0.5rem">
          &copy; 2024 Yumilk. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
}

export default Footer;