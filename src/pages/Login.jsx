import InputField from '@/components/Fields/Input';
import { Box, Button, Center, VStack, useToast } from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import authServices from '@/services/authServices';
import { login } from '@/features/Auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    username: yup.string().required('Vui lòng không bỏ trống'),
    password: yup.string().required('Vui lòng không bỏ trống'),
  });
  return (
    <Center flex='1'>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={async (data, event) => {
          try {
            const res = await authServices.login(data);
            event.setSubmitting(false);
            dispatch(login(res.data.data));
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
          } catch (err) {
            console.log('Login error: ', err);
            console.log(event);
            toast({
              title: err.serverMessage,
              status: 'error',
              duration: 2500,
              isClosable: true,
              position: 'top-right',
            });
          }
        }}
      >
        {formikProps => {
          return (
            <Box>
              <Form>
                <VStack>
                  <FastField
                    component={InputField}
                    placeholder='username'
                    label='Tên đăng nhập'
                    name='username'
                    required={true}
                    size='lg'
                    mb={2}
                  />
                  <FastField
                    component={InputField}
                    placeholder='Your Password'
                    label='Password'
                    name='password'
                    type='password'
                    required={true}
                    size='lg'
                  />
                </VStack>
                <Button
                  mt={2}
                  disabled={formikProps.isSubmitting}
                  isLoading={formikProps.isSubmitting}
                  type='submit'
                  bg={'pink.400'}
                  w='full'
                >
                  Gửi
                </Button>
              </Form>
            </Box>
          );
        }}
      </Formik>
    </Center>
  );
};

export default Login;
