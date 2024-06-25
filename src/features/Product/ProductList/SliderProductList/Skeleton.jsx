import { Box, Flex, Skeleton, SkeletonText } from '@chakra-ui/react';

const SliderProductListSkeleton = () => {
  return (
    <Box w='full' h='400px'>
      <Flex w='full' gap={2}>
        <Box minH='150px' flex='1'>
          <Skeleton h='full' w='full' />
          <SkeletonText mt='2' noOfLines={3} spacing='2' skeletonHeight='2' />
        </Box>
        <Box minH='150px' flex='1'>
          <Skeleton h='full' w='full' />
          <SkeletonText mt='2' noOfLines={3} spacing='2' skeletonHeight='2' />
        </Box>
        <Box
          minH='150px'
          flex='1'
          display={{
            base: 'none',
            lg: 'block',
          }}
        >
          <Skeleton h='full' w='full' />
          <SkeletonText mt='2' noOfLines={3} spacing='2' skeletonHeight='2' />
        </Box>
      </Flex>
    </Box>
  );
};

export default SliderProductListSkeleton;
