/* eslint-disable react/prop-types */
import { Avatar, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { PiStarFill } from 'react-icons/pi';

const StarList = ({ rate }) => {
  return (
    <>
      {[1, 2, 3, 4, 5].map(n => {
        if (n > rate) return <></>;
        return (
          <Icon key={n} as={PiStarFill} color='yellow.500' fontSize='1.1rem' />
        );
      })}
    </>
  );
};

function Feedback({ feedback }) {
  return (
    <HStack gap='2' w='full'>
      <Avatar />
      <VStack w='full' alignItems='flex-start' gap='2'>
        <Text fontSize='1rem' fontWeight={500} color='pink.500'>
          {feedback?.firstName} {feedback?.lastName}
        </Text>
        <HStack>
          <HStack gap='1'>
            <StarList rate={feedback?.rating} />{' '}
          </HStack>
          <Text color='gray.600' fontWeight={500} fontSize='0.85rem'>
            {dayjs(feedback?.createdAt).format('HH:mm  DD/MM/YYYY')}
          </Text>
        </HStack>
        <Text fontSize='1.2rem' fontWeight={500} fontStyle='italic'>
          {feedback?.review}
        </Text>
      </VStack>
    </HStack>
  );
}

export default Feedback;
