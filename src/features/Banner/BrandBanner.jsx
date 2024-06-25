import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, Grid, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const BrandBanner = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Grid]}
      spaceBetween={10}
      slidesPerView={3}
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
      <SwiperSlide>
        <img
          src='https://cdn1.concung.com/img/adds/2024/05/1716552222-HOME(1).png/'
          alt='brand'
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src='https://cdn1.concung.com/img/adds/2024/05/1716552222-HOME(1).png/'
          alt='brand'
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src='https://cdn1.concung.com/img/adds/2024/05/1716552222-HOME(1).png/'
          alt='brand'
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src='https://cdn1.concung.com/img/adds/2024/05/1716552222-HOME(1).png/'
          alt='brand'
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src='https://cdn1.concung.com/img/adds/2024/05/1716552222-HOME(1).png/'
          alt='brand'
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src='https://cdn1.concung.com/img/adds/2024/05/1716552222-HOME(1).png/'
          alt='brand'
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src='https://cdn1.concung.com/img/adds/2024/05/1716552222-HOME(1).png/'
          alt='brand'
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src='https://cdn1.concung.com/img/adds/2024/05/1716552222-HOME(1).png/'
          alt='brand'
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src='https://cdn1.concung.com/img/adds/2024/05/1716552222-HOME(1).png/'
          alt='brand'
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src='https://cdn1.concung.com/img/adds/2024/05/1716552222-HOME(1).png/'
          alt='brand'
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default BrandBanner;
