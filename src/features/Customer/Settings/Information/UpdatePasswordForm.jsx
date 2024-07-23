import { useUpdatePasswordMutation } from '@/apis/customerApi';
import InputField from '@/components/Fields/Input';
import { Box, Button, Flex, HStack, VStack, useToast } from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';

const UpdatePasswordForm = () => {
  const toast = useToast();
  const [updatePasswordAPI, { isLoading }] = useUpdatePasswordMutation();
  const validationSchema = yup.object().shape({
    oldPassword: yup.string().required('Vui lòng không bỏ trống'),
    newPassword: yup
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
      .required('Vui lòng không bỏ trống')
      .oneOf([yup.ref('newPassword'), null], 'Mật khẩu không trùng khớp'),
  });
  return (
    <Box w='full' mt={8}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        onSubmit={async (data, event) => {
          try {
            const res = await updatePasswordAPI(data);
            if (res.error) throw res.error.data;
            event.setSubmitting(false);
            event.resetForm();
            toast({
              title: 'Cập nhật thành công',
              status: 'success',
              duration: 1000,
              isClosable: true,
              position: 'top-right',
            });
          } catch (err) {
            console.log(err);
            event.setSubmitting(false);
            toast({
              title: err.message ?? 'Cập nhật thất bại',
              status: 'error',
              duration: 1000,
              isClosable: true,
              position: 'top-right',
            });
          }
        }}
      >
        <VStack as={Form} gap='1'>
          <FastField
            type='password'
            component={InputField}
            placeholder='Mật khẩu cũ'
            label='Mật khẩu cũ'
            name='oldPassword'
            required={true}
            size='lg'
            mb={2}
          />
          <HStack w='full' gap='1'>
            <FastField
              type='password'
              component={InputField}
              placeholder='Mật khẩu mới'
              label='Mật khẩu mới'
              name='newPassword'
              required={true}
              size='lg'
            />
            <FastField
              type='password'
              component={InputField}
              placeholder='Nhập lại mật khẩu mới'
              label='Nhập lại mật khẩu mới'
              name='confirmPassword'
              required={true}
              size='lg'
            />
          </HStack>
          <Flex justifyContent='flex-end' w='full' mt={2}>
            <Button type='submit' colorScheme='pink' isLoading={isLoading}>
              Đổi mật khẩu
            </Button>
          </Flex>
        </VStack>
      </Formik>
    </Box>
  );
};

export default UpdatePasswordForm;
