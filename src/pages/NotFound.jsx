import { Button, Center, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Center as={VStack} h='100vh' w='full'>
      <Image
        src='https://img.freepik.com/premium-vector/easy-use-doodle-mini-illustration-404-issue_67813-13685.jpg?w=1060'
        boxSize='400px'
      />
      <Text fontSize='1.6rem' fontWeight={600} my={4}>
        Không tìm thấy trang này
      </Text>
      <Button as={Link} to='/' colorScheme='pink'>
        Trang chủ
      </Button>
    </Center>
  );
};

export default NotFound;
