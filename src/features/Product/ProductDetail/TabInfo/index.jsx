import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

const TabInfo = ({productID}) => {
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
          <p>chi tiet!</p>
        </TabPanel>
        <TabPanel>
          <p>thong tin them!</p>
        </TabPanel>
        <TabPanel>
          <p>nhan hand!</p>
        </TabPanel>
        <TabPanel>
          <p>danh gia!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabInfo;
