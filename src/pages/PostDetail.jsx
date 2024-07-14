import { useGetPostDetailQuery } from '@/apis/postApi';
import PostContent from '@/features/Post/PostDetail/PostContent';
import { Box, Container } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const { data: postData, error, isLoading } = useGetPostDetailQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;

  return (
    <Container maxW='container.xl' py={8}>
      <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p={6}>
        {postData && <PostContent postData={postData} />}
      </Box>
    </Container>
  );
};

export default PostDetail;
