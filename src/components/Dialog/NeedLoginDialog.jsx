/* eslint-disable react/prop-types */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function NeedLoginDialog({ isOpen, onClose }) {
  const cancelRef = useRef();
  const nav = useNavigate();
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Thông báo
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Bạn cần đăng nhập để có thể sử dụng chức năng
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme='pink'
                onClick={() => {
                  nav('/login');
                }}
                ml={3}
              >
                Đăng nhập ngay
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
export default NeedLoginDialog;
