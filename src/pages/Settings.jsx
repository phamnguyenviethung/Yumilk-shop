import AddressIcon from '@/assets/Icon/address';
import Cart2Icon from '@/assets/Icon/cart2';
import UserIcon from '@/assets/Icon/user';
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
import { Fragment, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const tabs = [
  {
    name: 'Tài khoản',
    icon: UserIcon,
    content: Information,
  },
  {
    name: 'Địa chỉ',
    icon: AddressIcon,
    content: Address,
  },
  {
    name: 'Đơn hàng',
    icon: Cart2Icon,
    content: OrderHistory,
  },
  // {
  //   name: 'Đăng xuất',
  //   icon: LogoutIcon,
  //   handler: () => {
  //     store.dispatch(logout());
  //   },
  // },
];

const Settings = () => {
  const tabRef = useRef();
  let [searchParams] = useSearchParams();
  const index = searchParams.get('id') * 1 || 0;
  return (
    <Container maxW='container.xl'>
      <Tabs
        defaultIndex={index >= 0 && index < tabs.length - 1 ? index : 0}
        variant='soft-rounded'
        colorScheme='pink'
        w='full'
        display='flex'
        flexDirection={['column', 'column', 'column', 'row']}
        gap={['2', '2', '4']}
      >
        <TabList
          as={TabList}
          flex='1'
          display='flex'
          flexDirection={{
            base: 'row',
            lg: 'column',
          }}
          gap={{
            base: 1,
            lg: 4,
          }}
        >
          {tabs.map(tab => {
            return (
              <Tab
                key={tab.name}
                w='full'
                borderRadius='6px'
                fontSize={{
                  base: '1rem',
                  md: '1.1rem',
                }}
                p={[
                  {
                    base: 4,
                  },
                ]}
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
        <TabPanels flex='8' overflow='auto'>
          {tabs.map(tab => {
            const Content = tab.content || Fragment;
            return (
              <TabPanel ref={tabRef} key={tab.name}>
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
