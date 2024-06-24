/* eslint-disable react/prop-types */
import { useGetBrandInfoByIdQuery } from '@/apis/productApi';

const BrandTab = ({ brandId }) => {
  const brandInfo = useGetBrandInfoByIdQuery(brandId);
  return (
    <div>
      <h1>{brandInfo.data?.name}</h1>
      <p>{brandInfo.data?.description}</p>
    </div>
  );
};

export default BrandTab;
