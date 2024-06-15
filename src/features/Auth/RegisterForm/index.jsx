import { useRegisterMutation } from '@/apis/authApi';
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
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const RegisterForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [register] = useRegisterMutation();
  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .min(1, 'Phải ít nhất 1 kí tự')
      .required('Vui lòng không bỏ trống'),
    lastName: yup
      .string()
      .trim()
      .min(1, 'Phải ít nhất 1 kí tự')
      .required('Vui lòng không bỏ trống'),
    phoneNumber: yup
      .string()
      .trim()
      .min(1, 'Phải ít nhất 1 kí tự')
      .length(10, 'Số điện thoại phải là 10 số')
      .matches(/^[^\s]+$/, 'Tên người dùng không được chứa dấu cách')
      .required('Vui lòng không bỏ trống'),
    email: yup
      .string()
      .email('Vui lòng nhập vào 1 email')
      .matches(/^[^\s]+$/, 'Tên người dùng không được chứa dấu cách')
      .required('Vui lòng không bỏ trống'),
    username: yup
      .string()
      .trim()
      .min(1, 'Phải ít nhất 1 kí tự')
      .matches(/^[^\s]+$/, 'Tên người dùng không được chứa dấu cách')

      .required('Vui lòng không bỏ trống'),
    password: yup
      .string()
      .min(8, 'Mật khẩu phải tối thiểu 8 kí tự')
      .max(255, 'Mật khẩu tối đa chỉ được 255 kí tự')
      .required('Vui lòng không bỏ trống')
      .matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$', {
        message:
          'Mật khẩu phải có ít nhất 1 số, 1 kí tự đặc biệt, 1 chữ hoa và 1 chữ thường',
      }),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Mật khẩu không trùng khớp'),
  });
  return (
    <Container maxW='container.xl' pt={2} pb={8}>
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
              const res = await register(data);
              if (res.error) throw res.error.data;

              event.setSubmitting(false);
              toast({
                title: 'Đăng ký thành công',
                status: 'success',
                duration: 1000,
                isClosable: true,
                position: 'top-right',
                onCloseComplete: () => {
                  navigate('/login');
                },
              });
            } catch (err) {
              console.log('Register error: ', err);
              toast({
                title: err.message,
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
                      name='confirmPassword'
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
