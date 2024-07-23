import { useUpdateProfileMutation } from '@/apis/customerApi';
import InputField from '@/components/Fields/Input';
import { updateUserData } from '@/features/Auth/authSlice';
import uploadImgToImgur from '@/utils/uploadImageToImgur';
import {
  Avatar,
  Box,
  Button,
  InputGroup,
  Stack,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import ChangeUsernameModal from './ChangeUsernameModal';
import UpdatePasswordForm from './UpdatePasswordForm';

const Information = () => {
  const authState = useSelector(state => state.auth);
  const [avatar, setAvatar] = useState(authState?.userData?.profilePictureUrl);
  const [updateProfileAPI, { isLoading }] = useUpdateProfileMutation();
  const dispatch = useDispatch();
  const toast = useToast();
  const validationSchema = yup.object().shape({
    firstName: yup.string().required('Vui lòng không bỏ trống'),
    lastName: yup.string().required('Vui lòng không bỏ trống'),
    phoneNumber: yup
      .string()
      .length(10, 'Số điện thoại phải là 10 số')
      .required('Vui lòng không bỏ trống'),
  });
  return (
    <Box>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          ...authState.userData,
          profilePictureUrl: avatar,
        }}
        onSubmit={async (data, event) => {
          try {
            const res = await updateProfileAPI(data);
            if (res.error) throw res.error.data;
            event.setSubmitting(false);
            dispatch(updateUserData(res.data));
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
        {formikProps => {
          return (
            <VStack w='full'>
              <Stack
                w='full'
                mb={2}
                pb={4}
                alignItems='center'
                justifyContent='center'
                flexDirection={[
                  'column-reverse',
                  'column-reverse',
                  'column-reverse',
                  'row',
                ]}
                gap='4'
              >
                <VStack alignItems='flex-start' gap='2' flex='1' w='full'>
                  <FastField
                    component={InputField}
                    placeholder='Tên đăng nhập'
                    label='Tên đăng nhập'
                    name='username'
                    size='lg'
                    mb={2}
                    isReadOnly
                    border='0'
                    outline='0'
                  />
                  <ChangeUsernameModal />
                  <FastField
                    component={InputField}
                    placeholder='Email'
                    label='Email'
                    name='email'
                    size='lg'
                    mb={2}
                    isReadOnly
                    border='0'
                    outline='0'
                  />
                </VStack>
                <VStack flex='1' gap='4'>
                  <Avatar
                    name={
                      authState?.userData?.firstName +
                      authState?.userData?.lastName
                    }
                    src={avatar}
                    size='lg'
                  />
                  <input
                    size='sm'
                    type='file'
                    accept='image/png, image/jpeg'
                    onChange={async e => {
                      try {
                        const formData = new FormData();

                        if (e.target.files) {
                          const file = e.target.files[0];
                          formData.append('image', file);
                          formData.append('title', file.name);
                          formData.append('description', file.name);

                          const res = await uploadImgToImgur(formData);
                          setAvatar(res.data.data.link);
                          formikProps.setFieldValue(
                            'profilePictureUrl',
                            res.data.data.link
                          );
                        }
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  />
                </VStack>
              </Stack>
              <VStack as={Form} style={{ width: '100%' }}>
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
                <Button
                  isDisabled={formikProps.isSubmitting || isLoading}
                  isLoading={formikProps.isSubmitting || isLoading}
                  type='submit'
                  size='md'
                  colorScheme='pink'
                  alignSelf='flex-end'
                >
                  Lưu
                </Button>
              </VStack>
            </VStack>
          );
        }}
      </Formik>
      <UpdatePasswordForm />
    </Box>
  );
};

export default Information;
