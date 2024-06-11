import { useVerifyAccountMutation } from '@/apis/authApi';
import {
  Box,
  Button,
  Link as ChakraLink,
  Container,
  Text,
} from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Verify = () => {
  const [verifyAccountAPI, { isLoading, isError }] = useVerifyAccountMutation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [isValid, setValid] = useState(false);

  async function checkTokenExpired(t) {
    try {
      const res = jwtDecode(t);
      setValid(res);
    } catch (error) {
      setValid(false);
    }
  }

  const handleSubmitToken = async token => {
    try {
      const res = await verifyAccountAPI(token);
      if (res.error) throw res.error.data;
      setValid(true);
    } catch (error) {
      setValid(false);
    }
  };

  useEffect(() => {
    if (token) {
      checkTokenExpired(token);
      handleSubmitToken(token);
    }
  }, [token]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container maxW='container.xl'>
      <Box>
        {isValid && !isError ? (
          <Box>
            <Text color='green.400'>Xác nhận thành công</Text>
            <Link to='/'>
              <Button colorScheme='pink' size='sm'>
                Về trang chủ
              </Button>
            </Link>
          </Box>
        ) : (
          <Box>
            <Text fontSize='1.2rem' color='red.400' mb={2}>
              Link đã hết hạn hoặc không hợp lệ
            </Text>
            <ChakraLink as={Link} to='/ative-mail'>
              <Button size='sm' colorScheme='pink'>
                Gửi lại
              </Button>
            </ChakraLink>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Verify;
