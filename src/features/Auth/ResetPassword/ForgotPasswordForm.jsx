import { useForgotPasswordMutation } from '@/apis/authApi';
import InputField from '@/components/Fields/Input';
import { Box, Button, Center, Container, useToast } from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';

const ForgotPasswordForm = () => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Vui lòng nhập vào 1 email')
      .required('Vui lòng không bỏ trống'),
  });
  const [forgotPasswordAPI, { isLoading }] = useForgotPasswordMutation();
  const toast = useToast();
  return (
    <Container h='full'>
      <Center h='calc(100vh - 150px)'>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            email: '',
          }}
          onSubmit={async (data, event) => {
            try {
              const res = await forgotPasswordAPI(data.email);
              if (res.error) throw res.error.data;
              event.setSubmitting(false);
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
          }}
        >
          {formikProps => {
            return (
              <Box p={4}>
                <Form>
                  <FastField
                    component={InputField}
                    placeholder='Nhập email'
                    label='Email cần đặt lại mật khẩu'
                    name='email'
                    type='email'
                    required={true}
                    size='lg'
                  />
                  <Button
                    disabled={formikProps.isSubmitting}
                    isLoading={formikProps.isSubmitting || isLoading}
                    colorScheme='pink'
                    type='submit'
                    w='full'
                    mt={2}
                  >
                    Gửi
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

export default ForgotPasswordForm;
