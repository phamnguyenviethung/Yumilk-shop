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

function NoAddressDialog({ isOpen, onClose }) {
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
              Bạn chưa có địa chỉ để mua hàng. Hãy cập nhật ngay !
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme='pink'
                onClick={() => {
                  nav('/settings');
                }}
                ml={3}
              >
                Cập nhật
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
export default NoAddressDialog;
