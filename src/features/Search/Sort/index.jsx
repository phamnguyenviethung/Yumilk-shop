/* eslint-disable react/prop-types */
import { Box, Select } from '@chakra-ui/react';

const sortQueryList = [
  {
    name: 'Bán chạy nhất',
    query: {
      SortColumn: 'orderCount',
      SortOrder: 'desc',
    },
  },
  {
    name: 'Tên: A - Z',
    query: {
      SortColumn: 'name',
      SortOrder: 'asc',
    },
  },
  {
    name: 'Tên: Z - A',
    query: {
      SortColumn: 'name',
      SortOrder: 'desc',
    },
  },
  {
    name: 'Giá: Thấp - Cao',
    query: {
      SortColumn: 'originalPrice',
      SortOrder: 'asc',
    },
  },
  {
    name: 'Giá: Cao - Thấp',
    query: {
      SortColumn: 'originalPrice',
      SortOrder: 'desc',
    },
  },
];

const Sort = ({ setQueryStr }) => {
  return (
    <Box>
      <Select
        onChange={e => {
          setQueryStr(prev => {
            const data =
              sortQueryList.find(item => item.name === e.target.value) ||
              sortQueryList[0];
            const result = {
              ...prev,
              ...data.query,
            };
            console.log(result);
            return result;
          });
        }}
        placeholder='Sắp xếp'
        color='pink.600'
        fontWeight={500}
        _focusVisible={{
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'pink.600',
        }}
      >
        {sortQueryList.map(s => {
          return (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};

export default Sort;
