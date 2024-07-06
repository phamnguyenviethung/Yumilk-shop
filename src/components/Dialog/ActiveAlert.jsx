import { useSendActiveMailMutation } from '@/apis/authApi';
import {
  Box,
  Center,
  CircularProgress,
  Container,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const ActiveAlert = () => {
  const authState = useSelector(state => state.auth);
  const [activeAccountAPI, { isLoading }] = useSendActiveMailMutation();
  const toast = useToast();

  const handleClick = async () => {
    try {
      const res = await activeAccountAPI({ email: authState.userData.email });
      if (res.error) throw res.error.data;
      toast({
        title: 'Gửi thành công',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: error.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };
  return (
    <>
      {authState.isAuthenticated && !authState?.userData?.isActive && (
        <Box
          mb={4}
          h={{
            base: '80px',
            lg: '60px',
          }}
          bgColor='yellow.100'
        >
          <Container
            as={Center}
            maxW='container.xl'
            h='full'
            textAlign='center'
            py={8}
          >
            <Text
              fontWeight='500'
              fontSize={{
                base: '0.95rem',
                lg: '1rem',
              }}
            >
              Tài khoản bạn chưa được kích hoạt. Hãy kiểm tra email hoặc{' '}
              <Text
                as='span'
                onClick={handleClick}
                color='pink.400'
                cursor='pointer'
              >
                gửi lại{' '}
              </Text>
              email xác nhận.
            </Text>
            {isLoading && <CircularProgress isIndeterminate color='pink.400' />}
          </Container>
        </Box>
      )}
    </>
  );
};

export default ActiveAlert;
