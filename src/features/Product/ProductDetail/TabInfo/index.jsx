/* eslint-disable react/prop-types */
import {
  useGetBrandInfoByIdQuery,
  useGetDescriptionInfoByIdQuery,
} from '@/apis/productApi';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import AttributeTab from './AttributeTab';
import BrandTab from './BrandTab';
import DetailTab from './DetailTab';
import ReviewTab from './ReviewTab';

const TabInfo = ({ productID }) => {
  const { data } = useGetDescriptionInfoByIdQuery(productID);
  const { data: brandInfo } = useGetBrandInfoByIdQuery(data?.brandId, {
    skip: !data?.brandId,
  });

  return (
    <Tabs variant='soft-rounded' colorScheme='pink'>
      <TabList>
        <Tab
          fontSize={{
            base: '0.85rem',
            lg: '0.9rem',
          }}
        >
          Chi tiết
        </Tab>
        <Tab
          fontSize={{
            base: '0.85rem',
            lg: '0.9rem',
          }}
        >
          Thông tin thêm
        </Tab>
        <Tab
          fontSize={{
            base: '0.85rem',
            lg: '0.9rem',
          }}
        >
          Nhãn hàng
        </Tab>
        <Tab
          fontSize={{
            base: '0.85rem',
            lg: '0.9rem',
          }}
        >
          Đánh giá
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <DetailTab description={data?.description} />
        </TabPanel>
        <TabPanel>
          <AttributeTab />
        </TabPanel>
        <TabPanel>
          {brandInfo?.id && <BrandTab brandId={brandInfo?.id} />}
        </TabPanel>
        <TabPanel>
          <ReviewTab />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabInfo;
