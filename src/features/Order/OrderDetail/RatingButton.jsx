/* eslint-disable react/prop-types */
import { useSendFeedbackMutation } from '@/apis/productApi';
import {
  Button,
  Center,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { PiStar, PiStarFill } from 'react-icons/pi';

const RatingButton = ({ productId, orderId, productName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState('');
  const [sendFeedbackAPI, { isLoading }] = useSendFeedbackMutation();
  const toast = useToast();

  const handeSubmit = async () => {
    try {
      const res = await sendFeedbackAPI({
        productId,
        body: {
          review,
          rating: rate,
          orderId,
        },
      });
      if (res.error) throw res.error.data;
      onClose();
      toast({
        title: 'Đáng giá thành công',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Đánh giá thất bại',
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <Text color='pink.400' onClick={onOpen} cursor='pointer'>
        Đánh giá
      </Text>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Đánh giá</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={8}>
            <Text fontSize='1.1rem' mb={4}>
              Cảm nhận của bạn về sản phẩm
              <Text fontWeight='600' display='inline'>
                {' '}
                {productName}
              </Text>
            </Text>

            <Center w='full' gap='4'>
              {[1, 2, 3, 4, 5].map(n => {
                return (
                  <Icon
                    as={n <= rate ? PiStarFill : PiStar}
                    key={n}
                    fontSize={{
                      base: '2rem',
                      lg: '2.5rem',
                    }}
                    color='yellow.400'
                    cursor='pointer'
                    onMouseEnter={() => setRate(n)}
                    onClick={() => setRate(n)}
                  />
                );
              })}
            </Center>
            <Textarea
              mt={6}
              value={review}
              onChange={e => setReview(e.target.value)}
              placeholder='Đánh giá về sản phẩm'
              focusBorderColor='pink.400'
              border='1px solid'
              borderColor='pink.500'
              colorScheme='pink'
              size='lg'
              rows='8'
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='red'
              mr={3}
              onClick={onClose}
              variant='outline'
            >
              Huỷ
            </Button>
            <Button
              colorScheme='pink'
              onClick={handeSubmit}
              isDisabled={rate === 0}
              isLoading={isLoading}
            >
              Gửi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RatingButton;
