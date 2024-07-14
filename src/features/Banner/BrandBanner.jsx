import { useGetAllBrandQuery } from '@/apis/brandApi';
import { Center, Image } from '@chakra-ui/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, Grid, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const BrandBanner = () => {
  const { data: brandData } = useGetAllBrandQuery();

  return (
    <Swiper
      modules={[Pagination, A11y, Grid]}
      spaceBetween={4}
      slidesPerView={2}
      breakpoints={{
        480: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
      }}
      pagination={{ clickable: true }}
      grid={{
        fill: 'row',
        rows: 2,
      }}
      slideToClickedSlide={true}
    >
      {(brandData?.items || []).map(brand => (
        <SwiperSlide key={brand.id} style={{ minHeight: '120px' }}>
          <Center boxSize='full'>
            <Image
              borderRadius='10px'
              boxSize={100}
              src={
                brand.logo ||
                'https://cdn-v2.kidsplaza.vn/media/amasty/shopby/option_images/slider/bobby-logo-.jpg'
              }
              alt={brand.name}
            />
          </Center>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BrandBanner;
