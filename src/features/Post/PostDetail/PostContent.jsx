/* eslint-disable react/prop-types */
import {
    Box,
    Card,
    CardFooter,
    CardHeader,
    Divider,
    Heading,
    Text
} from '@chakra-ui/react';

const PostContent = ({ postData }) => {
  return (
    <Card w='full'>
      <CardHeader>
        <Heading as='h3' size='lg'>
          {postData.title}
        </Heading>
      </CardHeader>
      <Divider />
      <Box p={4}>
        {' '}
        {/* Adjusted from CardContent to Box */}
        <Text dangerouslySetInnerHTML={{ __html: postData.content }}></Text>
      </Box>
      <CardFooter>
        <Text>{new Date(postData.createdAt).toLocaleDateString()}</Text>
      </CardFooter>
    </Card>
  );
};

export default PostContent;
