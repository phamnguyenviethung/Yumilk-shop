import { Center, Heading } from '@chakra-ui/react';

const PreOrderCTA = () => {
  return (
    <Center w='full' minH='200px' bgColor='pink.200' borderRadius='10px'>
      <Heading as='h6' color='white' fontSize='2rem'>
        Hàng loạt các sản phẩm hot đang nhận đặt trước
      </Heading>
    </Center>
  );
};

export default PreOrderCTA;
