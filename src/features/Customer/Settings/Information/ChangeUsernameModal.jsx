import { useChangeUsernameMutation } from '@/apis/customerApi';
import InputField from '@/components/Fields/Input';
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import { useRef } from 'react';
import * as yup from 'yup';

function ChangeUsernameModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [changeUsernameAPI, { isLoading }] = useChangeUsernameMutation();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const validationSchema = yup.object().shape({
    newUsername: yup.string().required('Vui lòng không bỏ trống'),
    password: yup.string().required('Vui lòng không bỏ trống'),
  });
  return (
    <>
      <Button colorScheme='pink' variant='ghost' size='sm' onClick={onOpen}>
        {' '}
        Đổi tên người dùng
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Đổi tên người dùng</ModalHeader>
          <ModalCloseButton />
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              password: '',
              newUsername: '',
            }}
            onSubmit={async val => {
              try {
                const res = await changeUsernameAPI(val);
                if (res.error) throw res.error.data;
                toast({
                  title: 'Thành công',
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                  position: 'top-right',
                });
                onClose();
              } catch (err) {
                console.log(err);
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
            {() => {
              return (
                <Form>
                  <ModalBody pb={6}>
                    <FastField
                      component={InputField}
                      placeholder='Tên đăng nhập mới'
                      label='Tên đăng nhập mới'
                      name='newUsername'
                      size='lg'
                      mb={2}
                    />
                    <FastField
                      component={InputField}
                      placeholder='Mật khẩu'
                      label='Mật khẩu'
                      name='password'
                      type='password'
                      size='lg'
                      mb={2}
                    />
                  </ModalBody>

                  <ModalFooter>
                    <ButtonGroup>
                      <Button
                        onClick={onClose}
                        colorScheme='red'
                        variant='outline'
                        isLoading={isLoading}
                      >
                        Huỷ
                      </Button>
                      <Button
                        colorScheme='pink'
                        type='submit'
                        isLoading={isLoading}
                      >
                        Gửi
                      </Button>
                    </ButtonGroup>
                  </ModalFooter>
                </Form>
              );
            }}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChangeUsernameModal;
