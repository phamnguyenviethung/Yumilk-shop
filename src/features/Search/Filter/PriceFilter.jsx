/* eslint-disable react/prop-types */
import formatMoney from '@/utils/formatMoney';
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
const BASE_PRICE = 100000;
const PriceFilter = ({ setFilterQuery, min, max }) => {
  const [value, setValue] = useState([min / BASE_PRICE, max / BASE_PRICE]);
  return (
    <>
      <Text fontWeight='600'>
        {formatMoney(value[0] * BASE_PRICE)} -{' '}
        {formatMoney(value[1] * BASE_PRICE)}
      </Text>
      <RangeSlider
        aria-label={['min', 'max']}
        colorScheme='pink'
        defaultValue={value}
        onChange={v => {
          setValue(v);
          setFilterQuery(prev => {
            return {
              ...prev,
              minPrice: value[0] * BASE_PRICE,
              maxPrice: value[1] * BASE_PRICE,
            };
          });
        }}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </>
  );
};

export default PriceFilter;
