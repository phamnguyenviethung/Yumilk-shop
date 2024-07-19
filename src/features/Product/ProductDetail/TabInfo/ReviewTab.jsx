import { useGetFeedbackByProductIdQuery } from '@/apis/productApi';
import { useParams } from 'react-router-dom';
import Feedback from './Feedback';
import { Center, Text } from '@chakra-ui/react';

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
  return feedback?.items.map(item => (
    <Feedback key={item.id} feedback={item} />
  ));
};

export default ReviewTab;
