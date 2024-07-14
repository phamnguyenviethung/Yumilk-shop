import { useGetAllVouchersQuery } from '@/apis/voucherApi';
import Loading from '@/components/Loading';
import { Box, Center, HStack, Tag, Text, VStack } from '@chakra-ui/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
const VoucherList = () => {
  const { data, isLoading } = useGetAllVouchersQuery({
    isActive: true,
    pageSize: 10,
  });

  if (isLoading) {
    return (
      <Center boxSize='full'>
        <Loading />
      </Center>
    );
  }

  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination
      modules={[Pagination]}
      className='mySwiper'
      style={{
        minHeight: '150px',
      }}
    >
      {data.items.map(v => {
        return (
          <SwiperSlide key={v.id}>
            <Box
              border='2px dashed'
              borderColor='pink.400'
              p={1}
              minH='100px'
              w='full'
            >
              <Box
                textAlign='center'
                bgColor='pink.500'
                color='white'
                fontSize='2rem'
                fontWeight={600}
                borderRadius={10}
              >
                <Text>{v.code}</Text>
              </Box>
              <HStack w='full'>
                <VStack>
                  <Text color='gray.600' fontWeight={500}>
                    Số lượt còn lại: {v.quantity}
                  </Text>
                </VStack>
                <Box></Box>
              </HStack>
            </Box>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default VoucherList;
