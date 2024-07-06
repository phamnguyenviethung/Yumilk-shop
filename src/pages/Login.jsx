import { useLoginWithGoogleMutation } from '@/apis/authApi';
import GoogleIcon from '@/assets/Icon/google';
import { auth, googleProvider } from '@/configs/firebase';
import LoginForm from '@/features/Auth/LoginForm';
import { login as loginSlice } from '@/features/Auth/authSlice';
import { Box, Button, Center, Icon, VStack, useToast } from '@chakra-ui/react';
import { signInWithPopup } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const authState = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [loginWithGoogleAPI, { isLoading }] = useLoginWithGoogleMutation();
  const toast = useToast();
  const dispatch = useDispatch();
  const login = async () => {
    try {
      const firebaseRes = await signInWithPopup(auth, googleProvider);
      const res = await loginWithGoogleAPI(firebaseRes.user.accessToken);
      if (res.error) throw res.error.data;
      dispatch(loginSlice(res.data));
      toast({
        title: 'Đăng nhập thành công',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
        onCloseComplete: () => {
          navigate('/');
        },
      });
    } catch (error) {
      console.log(error);
      toast({
        title: error.message,
        status: 'error',
        duration: 2500,
        isClosable: true,
        position: 'top-right',
      });
    }
  };
  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/');
    }
  }, [authState.isAuthenticated, navigate]);

  return (
    <VStack as={Center} flex='1' px={4} w='full'>
      <Box
        w={{
          base: 'full',
          lg: '30%',
        }}
        px={2}
      >
        <Center w='full' mb={4}>
          <Button
            variant='outline'
            w='full'
            size='lg'
            onClick={login}
            isLoading={isLoading}
            leftIcon={
              <Icon
                as={GoogleIcon}
                fontSize={{
                  base: '20px',
                  lg: '35px',
                }}
              />
            }
          >
            Đăng nhập với Google
          </Button>
        </Center>
        <LoginForm />
      </Box>
    </VStack>
  );
};

export default Login;
