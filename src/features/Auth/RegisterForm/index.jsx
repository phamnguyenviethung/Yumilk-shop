import InputField from '@/components/Fields/Input';
import {
  Box,
  Button,
  Center,
  Container,
  InputGroup,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import authServices from '@/services/authServices';
import { login } from '@/features/Auth/authSlice';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    firstName: yup.string().required('Vui lòng không bỏ trống'),
    lastName: yup.string().required('Vui lòng không bỏ trống'),
    phoneNumber: yup.string().required('Vui lòng không bỏ trống'),
    email: yup
      .string()
      .email('Vui lòng nhập vào 1 email')
      .required('Vui lòng không bỏ trống'),
    username: yup.string().required('Vui lòng không bỏ trống'),
    password: yup
      .string()
      .min(8)
      .required('Vui lòng không bỏ trống')
      .matches(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,255}$',
        {
          message:
            'Mật khẩu phải có ít nhất 1 số, 1 kí tự đặc biệt,\n1 chữ hoa, 1 chữ thường và có độ dài tối thiểu là 8',
        }
      ),
    comfirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Mật khẩu không trùng khớp'),
  });
  return (
    <Container maxW='container.xl'>
      <Center flex='1' w='full'>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            username: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={async (data, event) => {
            try {
              const res = await authServices.login(data);
              event.setSubmitting(false);
              // dispatch(login(res.data.data));
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
              <Box w={['full', '50%']} px={2}>
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
                    />{' '}
                    <InputGroup>
                      <FastField
                        component={InputField}
                        placeholder='Họ'
                        label='Họ'
                        name='firstName'
                        required={true}
                        size='lg'
                        mb={2}
                        w='98%'
                      />{' '}
                      <FastField
                        component={InputField}
                        placeholder='Tên'
                        label='Tên'
                        name='lastName'
                        required={true}
                        size='lg'
                        mb={2}
                      />{' '}
                    </InputGroup>
                    <FastField
                      component={InputField}
                      placeholder='Số điện thoại'
                      label='Số điện thoại'
                      name='phoneNumber'
                      required={true}
                      size='lg'
                      mb={2}
                    />
                    <FastField
                      component={InputField}
                      placeholder='Email'
                      label='Email'
                      name='email'
                      type='email'
                      required={true}
                      size='lg'
                    />
                    <FastField
                      component={InputField}
                      placeholder='Mật khẩu'
                      label='Mật khẩu'
                      name='password'
                      type='password'
                      required={true}
                      size='lg'
                    />
                    <FastField
                      component={InputField}
                      placeholder='Xác nhận mật khẩu'
                      label='Xác nhận mật khẩu'
                      name='comfirmPassword'
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
                    Đăng ký
                  </Button>
                </Form>
              </Box>
            );
          }}
        </Formik>
      </Center>
    </Container>
  );
};

export default RegisterForm;
