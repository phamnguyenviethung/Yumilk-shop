import AddressIcon from '@/assets/Icon/address';
import Cart2Icon from '@/assets/Icon/cart2';
import LogoutIcon from '@/assets/Icon/logout';
import UserIcon from '@/assets/Icon/user';
import store from '@/configs/store';
import { logout } from '@/features/Auth/authSlice';
import Address from '@/features/Customer/Settings/Address';
import Information from '@/features/Customer/Settings/Information';
import OrderHistory from '@/features/Customer/Settings/OrderHistory';
import {
  Container,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { Fragment } from 'react';

const tabs = [
  {
    name: 'Thông tin tài khoản',
    icon: UserIcon,
    content: Information,
  },
  {
    name: 'Địa chỉ',
    icon: AddressIcon,
    content: Address,
  },
  {
    name: 'Đơn hàng của tôi',
    icon: Cart2Icon,
    content: OrderHistory,
  },
  {
    name: 'Đăng xuất',
    icon: LogoutIcon,
    handler: () => {
      store.dispatch(logout());
    },
  },
];

const Settings = () => {
  return (
    <Container maxW='container.xl'>
      <Tabs
        variant='soft-rounded'
        colorScheme='pink'
        w='full'
        display='flex'
        flexDirection={['column', 'column', 'row']}
        gap={['4', '4', '8']}
      >
        <TabList
          as={TabList}
          flex='1'
          display='flex'
          flexDirection='column'
          gap='4'
        >
          {tabs.map(tab => {
            return (
              <Tab
                key={tab.name}
                w='full'
                borderRadius='6px'
                fontSize='1.2rem'
                p={4}
                whiteSpace='nowrap'
                onClick={tab.handler}
                justifyContent={{
                  base: 'center',
                  md: 'flex-start',
                }}
              >
                <Icon as={tab.icon} mr='2' />
                <Text> {tab.name}</Text>
              </Tab>
            );
          })}
        </TabList>
        <TabPanels flex='5'>
          {tabs.map(tab => {
            const Content = tab.content || Fragment;
            return (
              <TabPanel key={tab.name}>
                <Content />
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Settings;
