/* eslint-disable react/prop-types */
import { Box, Heading } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Product from '../Product';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useGetSellingProductQuery } from '@/apis/productApi';
import Skeleton from './Skeleton';
import './nav.css';
const SliderProductList = ({ params, heading }) => {
  const { data, isLoading } = useGetSellingProductQuery(params);

  if (isLoading) return <Skeleton />;
  return (
    <Box my={4}>
      <Box w='full' mb={8}>
        <Heading as='h6' fontWeight='600' fontSize='1.25rem'>
          {heading}
        </Heading>
      </Box>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        breakpoints={{
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 5,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        className='mySwiper'
      >
        {data.items.map(product => {
          return (
            <SwiperSlide key={product.id}>
              <Product data={product} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default SliderProductList;
