import InputField from '@/components/Fields/Input';
import { Box, Button, Center, VStack } from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';

const Login = () => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Email không đúng dịnh dạng   ')
      .required('Vui lòng không bỏ trống'),
    password: yup.string().required('Vui lòng không bỏ trống'),
  });
  return (
    <Center flex='1'>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(data, event) => {
          console.log('login');
          event.setSubmitting(false);
        }}
      >
        {formikProps => {
          return (
            <Box>
              <Form>
                <VStack>
                  <FastField
                    component={InputField}
                    placeholder='Your Email'
                    label='Email'
                    name='email'
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
