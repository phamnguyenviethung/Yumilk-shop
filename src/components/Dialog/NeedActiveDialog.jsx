/* eslint-disable react/prop-types */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function NeedActiveDialog({ isOpen, onClose }) {
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

            <AlertDialogBody>
              Bạn cần xác nhận tài khoản để có thể đặt hàng
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme='pink'
                onClick={() => {
                  nav('/');
                }}
                ml={3}
              >
                Đã hiểu
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
export default NeedActiveDialog;
