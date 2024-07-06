import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, Grid, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetAllBrandQuery } from '@/apis/brandApi';
import { Image } from '@chakra-ui/react';

const BrandBanner = () => {
  const { data: brandData } = useGetAllBrandQuery();

  // Inline style for slides
  const slideStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Adjust width as needed
    height: '200px', // Adjust height as needed
  };

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Grid]}
      spaceBetween={4}
      slidesPerView={4}
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
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      grid={{
        fill: 'row',
        rows: 2,
      }}
      slideToClickedSlide={true}
    >
      {(brandData?.items || []).map(brand => (
        <SwiperSlide key={brand.logo} style={slideStyle}>
          <Image
            boxSize={200}
            src={
              brand.logo ||
              'https://cdn-v2.kidsplaza.vn/media/amasty/shopby/option_images/slider/bobby-logo-.jpg'
            }
            alt={brand.name}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BrandBanner;
