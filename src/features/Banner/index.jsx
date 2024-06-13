import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const settings = {
  showThumbnails: false,
  showFullscreenButton: false,
  showPlayButton: false,
  showBullets: true,
  autoPlay: true,
  slideInterval: 2000,
  showNav: false,
};

const images = [
  {
    original:
      'https://cdn1.concung.com/img/adds/2024/06/1718034228-HOME(2).png',
  },
  {
    original:
      'https://cdn1.concung.com/img/adds/2024/05/1716552222-HOME(1).png/',
  },
  {
    original:
      'https://cdn1.concung.com/img/adds/2024/06/1718034228-HOME(2).png',
  },
];

function Banner() {
  return <ImageGallery items={images} {...settings} />;
}

export default Banner;
