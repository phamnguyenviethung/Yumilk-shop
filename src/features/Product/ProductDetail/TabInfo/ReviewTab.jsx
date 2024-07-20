import { useGetFeedbackByProductIdQuery } from '@/apis/productApi';
import { useParams } from 'react-router-dom';
import Feedback from './Feedback';
import { Center, Text, VStack } from '@chakra-ui/react';

const ReviewTab = () => {
  const { id } = useParams();
  const { data: feedback } = useGetFeedbackByProductIdQuery(id);

  if (feedback?.items?.length === 0) {
    return (
      <Center boxSize='full'>
        <Text>Không có đánh giá nào</Text>
      </Center>
    );
  }
  return (
    <VStack gap='2' w='full'>
      {feedback?.items.map(item => {
        return <Feedback key={item.id} feedback={item} />;
      })}
    </VStack>
  );
};

export default ReviewTab;
