import { useResetPasswordMutation } from '@/apis/authApi';
import InputField from '@/components/Fields/Input';
import { Box, Button, Center, VStack, useToast } from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';

// eslint-disable-next-line react/prop-types
const ResetPasswordForm = ({ token }) => {
  const [resetPasswordAPI, { isLoading }] = useResetPasswordMutation();
  const validationSchema = yup.object().shape({
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
  const toast = useToast();
  return (
    <Center h='calc(100vh - 150px)'>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async (data, event) => {
          try {
            const res = await resetPasswordAPI({
              token,
              ...data,
            });
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
                <VStack gap='4'>
                  <FastField
                    component={InputField}
                    placeholder='Mật khẩu mới'
                    label='Mật khẩu mới'
                    name='password'
                    type='password'
                    required={true}
                    size='lg'
                  />
                  <FastField
                    component={InputField}
                    placeholder='Xác nhận mật khẩu mới'
                    label='Xác nhận mật khẩu mới'
                    name='confirmPassword'
                    type='password'
                    required={true}
                    size='lg'
                  />
                  <Button
                    disabled={formikProps.isSubmitting}
                    isLoading={formikProps.isSubmitting || isLoading}
                    colorScheme='pink'
                    type='submit'
                    w='full'
                  >
                    Gửi
                  </Button>
                </VStack>
              </Form>
            </Box>
          );
        }}
      </Formik>
    </Center>
  );
};

export default ResetPasswordForm;
