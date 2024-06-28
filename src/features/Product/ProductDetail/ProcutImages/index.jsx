/* eslint-disable react/prop-types */
import { useGetProductImgagesQuery } from '@/apis/productApi';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ProductImages = ({ id }) => {
  const { data, isLoading } = useGetProductImgagesQuery(id);
  console.log(data);
  if (isLoading) return <p>loading</p>;
  return (
    <ImageGallery
      items={
        data
          ? data.map(img => {
              return {
                original: img.imageUrl,
                thumbnail: img.imageUrl,
              };
            })
          : [
              {
                original: 'https://placehold.co/200',
                thumbnail: 'https://placehold.co/200',
              },
            ]
      }
      showPlayButton={false}
      lazyLoad
      autoPlay
      showIndex
      showNav={false}
    />
  );
};

export default ProductImages;
