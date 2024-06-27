/* eslint-disable react/prop-types */
import { useGetAllBrandQuery } from '@/apis/brandApi';
import { Checkbox, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
const BrandFilter = ({ setFilterQuery, selectedData }) => {
  const { data, isLoading } = useGetAllBrandQuery();
  const [brands, setBrands] = useState(selectedData);

  if (isLoading) return <p>loading</p>;

  const handleCheck = (brandID, isChecked) => {
    if (isChecked) {
      setBrands(prev => {
        prev.push(brandID);
        return prev;
      });
    } else {
      setBrands(prev => prev.filter(id => id !== brandID));
    }

    setFilterQuery(prev => {
      return {
        ...prev,
        brandIds: brands,
      };
    });
  };

  return (
    <SimpleGrid columns={2} w='full' spacing={4}>
      {data.items.map(brand => {
        return (
          <Checkbox
            isChecked={selectedData.includes(brand.id)}
            onChange={e => handleCheck(brand.id, e.target.checked)}
            key={brand.id}
            colorScheme='pink'
          >
            {brand.name}
          </Checkbox>
        );
      })}
    </SimpleGrid>
  );
};

export default BrandFilter;
