import { useGetFeedbackByProductIdQuery } from '@/apis/productApi';
import { useParams } from 'react-router-dom';
import Feedback from './Feedback';

const ReviewTab = () => {
  const { id } = useParams();
  const { data: feedback } = useGetFeedbackByProductIdQuery(id);
  return feedback?.items.map(item => (
    <Feedback key={item.id} feedback={item} />
  ));
};

export default ReviewTab;
