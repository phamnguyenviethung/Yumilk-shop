import { useResetPasswordMutation } from '@/apis/authApi';
import ResetPasswordForm from '@/features/Auth/ResetPassword';
import {
  Box,
  Text,
  Link as ChakraLink,
  Button,
  Container,
} from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
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

  useEffect(() => {
    if (token) {
      checkTokenExpired(token);
    }
  }, [token]);

  return (
    <Container maxW='full' h='full'>
      {isValid ? (
        <ResetPasswordForm token={token} />
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
    </Container>
  );
};
export default ResetPassword;
