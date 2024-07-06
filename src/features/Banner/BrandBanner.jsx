import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, Grid, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetAllBrandQuery } from '@/apis/brandApi';

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
      spaceBetween={10}
      slidesPerView={8}
      navigation={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={swiper => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      grid={{
        fill: 'row',
        rows: 2,
      }}
      slideToClickedSlide={true}
      className='mySwiper'
    >
      {(brandData?.items || []).map((brand, index) => (
        <SwiperSlide key={index} style={slideStyle}>
          <img src={brand.logo || 'null'} alt={brand.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BrandBanner;