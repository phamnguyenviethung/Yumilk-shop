/* eslint-disable react/prop-types */
import { useGetBrandInfoByIdQuery } from '@/apis/productApi';
import { Box, Divider, Image, Text, VStack } from '@chakra-ui/react';

const BrandTab = ({ brandId }) => {
  const { data } = useGetBrandInfoByIdQuery(brandId);
  return (
    <Box w='full'>
      <VStack gap='4' mb={8}>
        <Image src={data.logo} boxSize={[100, 120]} />

        <Text fontWeight={700} color='pink.400' fontSize='2rem'>
          {data.name}
        </Text>
      </VStack>
      <Divider />
      <Text fontWeight={500} fontStyle='italic' fontSize='1rem'>
        {data.description}
      </Text>
    </Box>
  );
};

export default BrandTab;
