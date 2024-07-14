import { Box, Heading, Text } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Skeleton from './Skeleton';
import './nav.css';
import Post from '../Post';
import { useGetPostListQuery } from '@/apis/postApi';

const SliderPostList = ({ params, heading }) => {
    const { data, isLoading, isError } = useGetPostListQuery(params);

    if (isLoading) return <Skeleton />;

    if (isError)
        return (
            <Box w='full'>
                <Text>Có lỗi xảy ra</Text>
            </Box>
        );

    return (
        <Box my={4}>
            <Box w='full' mb={4}>
                <Heading
                    as='h6'
                    fontWeight='600'
                    fontSize={{
                        base: '1.2rem',
                        lg: '1.5rem',
                    }}
                >
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
                {data.items.map(post => {
                    return (
                        <SwiperSlide key={post.id}>
                            <Post data={post} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </Box>
    )
}

export default SliderPostList