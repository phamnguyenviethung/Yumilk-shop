import { Box, Icon, Stack, Text, Link, VStack, HStack, Divider, Grid, GridItem } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from '@/assets/logo.png';
import { IoLocationOutline } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { MdOutlineAlternateEmail } from "react-icons/md";

const Footer = () => {
  return (
    <Box>
      <Divider my={'8'} />
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={'0'}>
        <GridItem>
          <Stack>
            <Text fontWeight={'bold'}>Cửa hàng sữa cho mẹ bầu và em bé</Text>
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
        </GridItem>
        <GridItem>
          <Stack>
            <Text fontWeight={'bold'}>Về chúng tôi</Text>
            <Link>Trang chủ</Link>
            <Link>Giới thiệu</Link>
            <Link>Liên hệ</Link>
            <Link>Dịch vụ</Link>
          </Stack>
        </GridItem>
        <GridItem>
          <Stack>
            <Text fontWeight={'bold'}>Hỗ trợ khách hàng</Text>
            <Link>Tra cứu hoá đơn</Link>
            <Link>Hình thức thanh toán</Link>
          </Stack>
        </GridItem>
      </Grid>
      <Divider my={'8'} />
      <Text>© 2024 Yumilk  | All rights reserved</Text>
    </Box>
  );
}

export default Footer;