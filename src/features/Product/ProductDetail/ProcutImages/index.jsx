import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const images = [
  {
    original: 'https://placehold.co/200',
    thumbnail: 'https://placehold.co/200',
  },
  {
    original: 'https://placehold.co/200',
    thumbnail: 'https://placehold.co/200',
  },
  {
    original: 'https://placehold.co/200',
    thumbnail: 'https://placehold.co/200',
  },
];

const ProductImages = () => {
  return (
    <ImageGallery
      items={images}
      showPlayButton={false}
      lazyLoad
      autoPlay
      showIndex
      showNav={false}
    />
  );
};

export default ProductImages;
