/* eslint-disable react/prop-types */
import { useGetAllCategoryQuery } from '@/apis/categoryApi';
import { Checkbox, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
const CategoryFilter = ({ setFilterQuery, selectedData }) => {
  const { data, isLoading } = useGetAllCategoryQuery({ pageSize: 999999999 });
  const [categories, setCategories] = useState(selectedData);

  if (isLoading) return <p>loading</p>;

  const handleCheck = (categoryID, isChecked) => {
    if (isChecked) {
      setCategories(prev => {
        prev.push(categoryID);
        return prev;
      });
    } else {
      setCategories(prev => prev.filter(id => id !== categoryID));
    }

    setFilterQuery(prev => {
      return {
        ...prev,
        categoryIds: categories,
      };
    });
  };

  return (
    <SimpleGrid columns={2} w='full' spacing={4}>
      {data.items.map(category => {
        return (
          <Checkbox
            isChecked={selectedData.includes(category.id)}
            onChange={e => handleCheck(category.id, e.target.checked)}
            key={category.id}
            colorScheme='pink'
          >
            {category?.parentName ? category?.parentName + ' / ' : ''}
            {category.name}
          </Checkbox>
        );
      })}
    </SimpleGrid>
  );
};

export default CategoryFilter;
