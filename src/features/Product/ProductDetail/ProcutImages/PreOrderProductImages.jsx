/* eslint-disable react/prop-types */
import { useGetProductImgagesQuery } from '@/apis/productApi';
import { Center, Image } from '@chakra-ui/react';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './style.css';
const PreOrderProductImages = ({ id }) => {
  const { data, isLoading } = useGetProductImgagesQuery(id);
  if (isLoading) return <p>loading</p>;
  return (
    <Center w='full'>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards, Pagination]}
        pagination={true}
        className='swiper-preorder'
      >
        {data ? (
          data.map(img => {
            return (
              <SwiperSlide key={img.imageUrl}>
                <Image src={img.imageUrl} />
              </SwiperSlide>
            );
          })
        ) : (
          <>
            <SwiperSlide>
              <Image src=' https://placehold.co/400' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src='https://placehold.co/400' />
            </SwiperSlide>
          </>
        )}
      </Swiper>
    </Center>
  );
};

export default PreOrderProductImages;
