import { Container, Tab, TabList, TabPanel, TabPanels, Table, Tabs, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { useGetDescriptionInfoByIdQuery, useGetAttributeValueByIdQuery, useGetBrandInfoByIdQuery, useGetFeedbackByProductIdQuery } from '@/apis/productApi';
import DetailTab from './DetailTab';
import AttributeTab from './AttributeTab';
import BrandTab from './BrandTab';
import ReviewTab from './ReviewTab';

const TabInfo = ({ productID }) => {
  const { data } = useGetDescriptionInfoByIdQuery(productID);
  const { data: brandInfo } = useGetBrandInfoByIdQuery(data?.brandId, {
    skip: !data?.brandId,
  });
  const { data: attributeValues } = useGetAttributeValueByIdQuery(productID);
  const { data: feedback } = useGetFeedbackByProductIdQuery(productID);

  // console.log(data)
  // console.log(attributeValues)
  // console.log(brandInfo)
  // console.log(feedback)
  return (
    <Tabs variant='soft-rounded' colorScheme='green'>
      <TabList>
        <Tab>Chi tiết</Tab>
        <Tab>Thông tin thêm</Tab>
        <Tab>Nhãn hàng</Tab>
        <Tab>Đánh giá</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {/* <Container>{data?.description}</Container> */}
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
    </Tabs >
  );
};

export default TabInfo;
