/* eslint-disable react/prop-types */
import { useGetBrandInfoByIdQuery } from '@/apis/productApi';
import { Box, HStack, Image, Text } from '@chakra-ui/react';

const BrandTab = ({ brandId }) => {
  const { data } = useGetBrandInfoByIdQuery(brandId);
  return (
    <Box w='full'>
      <HStack w='full' gap='2'>
        <Image src={data.logo} boxSize={[100, 120]} />
        <Text fontWeight={700} color='pink.400' fontSize='1.5rem'>
          {data.name}
        </Text>
      </HStack>
      <Text fontWeight={700} color='pink.400' fontSize='1.5rem'>
        {data.description}
      </Text>
    </Box>
  );
};

export default BrandTab;
