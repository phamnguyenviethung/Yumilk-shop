/* eslint-disable react/prop-types */
import { useGetAllVouchersQuery } from '@/apis/voucherApi';
import MilkIcon from '@/assets/Icon/milk';
import Loading from '@/components/Loading';
import formatMoney from '@/utils/formatMoney';
import {
  Box,
  Button,
  Center,
  Icon,
  Stack,
  Text,
  useClipboard,
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const CopyButton = ({ code }) => {
  const { onCopy, setValue, hasCopied, value } = useClipboard(code);

  return (
    <Button
      colorScheme='pink'
      size='sm'
      isDisabled={hasCopied && value === code}
      onClick={() => {
        setValue(code);
        onCopy();
      }}
    >
      {hasCopied && value === code ? 'Đã sao chép' : 'Lấy mã'}
    </Button>
  );
};

const VoucherList = () => {
  const { data, isLoading, isError } = useGetAllVouchersQuery({
    isActive: true,
    pageSize: 10,
    sortOrder: 'desc',
    sortColumn: 'percent',
  });

  if (isLoading) {
    return (
      <Center boxSize='full'>
        <Loading />
      </Center>
    );
  }

  if (isError) return <></>;
  return (
    <Swiper
      slidesPerView={2}
      breakpoints={{
        480: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 3,
        },
      }}
      spaceBetween={30}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className='mySwiper'
      style={{
        minHeight: '100px',
      }}
    >
      {data?.items
        .filter(i => i.isAvailable)
        .map(v => {
          return (
            <SwiperSlide
              key={v.id}
              style={{
                minHeight: '100%',
              }}
            >
              <Stack
                flexDirection={{
                  base: 'column',
                  lg: 'row',
                }}
                alignItems='center'
                px={2}
                py={[2, 2, 1]}
                minH={[200, 120]}
                w='full'
                bgColor='blackAlpha.200'
                borderRadius='10px'
              >
                <Center boxSize='full' flex='1'>
                  <Icon
                    as={MilkIcon}
                    fontSize='2rem'
                    bgColor='pink.400'
                    color='white'
                    borderRadius='50%'
                    p='4'
                    boxSize={{
                      base: '50px',
                      lg: '80px',
                    }}
                  />
                </Center>
                <VStack
                  w='full'
                  flex='2'
                  justifyContent='space-between'
                  alignItems='flex-start'
                  px={1}
                >
                  <Box
                    w='full'
                    textAlign={{
                      base: 'center',
                      lg: 'left',
                    }}
                  >
                    <Text fontWeight={700} fontSize='1.2rem'>
                      {' '}
                      Giảm {v?.percent}%
                    </Text>
                    <Text fontWeight={500} color='gray.600' fontSize='0.8rem'>
                      {' '}
                      Đơn hàng từ {formatMoney(v?.minPriceCondition)}
                    </Text>
                    <Text fontWeight={500} color='gray.600' fontSize='0.8rem'>
                      {' '}
                      Giảm tối đa {formatMoney(v?.maxDiscount)}
                    </Text>
                  </Box>
                  <Stack
                    flexDirection={{ base: 'column', lg: 'row' }}
                    w='full'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Box>
                      <Text color='gray.700' fontSize='0.8rem'>
                        HSD: {dayjs(v.endDate).format('HH:mm DD/MM')}
                      </Text>
                    </Box>
                    <CopyButton code={v?.code} />
                  </Stack>
                </VStack>
              </Stack>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default VoucherList;
