/* eslint-disable react/prop-types */
import CartIcon from '@/assets/Icon/cart';
import NeedLoginDialog from '@/components/Dialog/NeedLoginDialog';
import PreOrderCheckoutModal from '@/features/Checkout/PreOrderCheckoutModal';
import formatMoney from '@/utils/formatMoney';
import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const InfoText = ({ name, value }) => {
  return (
    <HStack justifyContent='space-between'>
      <Text>{name}</Text>
      <Text color='pink.400' fontWeight={600}>
        {value}
      </Text>
    </HStack>
  );
};

const PreOrderProductInfo = ({ productData }) => {
  const auth = useSelector(state => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const loginDis = useDisclosure();
  return (
    <VStack
      boxSize='full'
      textAlign='left'
      justifyContent='space-between'
      pb={2}
    >
      <VStack textAlign='left' gap='2' w='full' flex='1'>
        <Heading
          w='full'
          as='h2'
          fontSize={{
            base: '1.6rem',
            lg: '2rem',
          }}
          fontWeight='500'
        >
          {[productData?.name]}
        </Heading>

        <Box w='full' my={4}>
          {productData.salePrice !== 0 && (
            <Text
              as='s'
              w='full'
              color='gray.400'
              my={4}
              fontSize='1.2rem'
              fontWeight='600'
            >
              {formatMoney(productData.originalPrice)}
            </Text>
          )}
          <Text w='full' color='pink.400' fontSize={'2rem'} fontWeight='800'>
            {formatMoney(
              productData.salePrice === 0
                ? productData.originalPrice
                : productData.salePrice
            )}
          </Text>
        </Box>
      </VStack>
      <VStack
        w='full'
        gap='4'
        p={4}
        border='1px solid'
        borderColor='pink.400'
        borderRadius='10px'
        alignItems='flex-start'
      >
        <InfoText
          name='Ngày mở bán:'
          value={dayjs(productData.startDate)
            .add(dayjs().utcOffset(), 'minutes')
            .format('HH:mm DD/MM/YYYY')}
        />
        <InfoText
          name='Ngày kết thúc:'
          value={dayjs(productData.endDate)
            .add(dayjs().utcOffset(), 'minutes')
            .format('HH:mm DD/MM/YYYY')}
        />
        <InfoText
          name='Số lượng còn lại:'
          value={productData.maxPreOrderQuantity}
        />
        <InfoText
          name='Dự kiến giao hàng:'
          value={dayjs(productData.endDate)
            .add(productData.expectedPreOrderDays, 'day')
            .add(dayjs().utcOffset(), 'minutes')
            .format('DD/MM/YYYY')}
        />
      </VStack>
      <Stack flexDirection='column' w='full' gap='2' flex='2'>
        <Stack
          flexDirection={{
            base: 'row',
            lg: 'column',
          }}
          w='full'
          flex='2'
        >
          <Box w='full' mt={[0, 0, 4]}>
            <Button
              w={{
                base: 'full',
                lg: '40%',
              }}
              size={['sm', 'md', 'lg']}
              colorScheme='pink'
              leftIcon={<Icon as={CartIcon} fontWeight='800' />}
              onClick={auth.isAuthenticated ? onOpen : loginDis.onOpen}
              isDisabled={
                productData.maxPreOrderQuantity === 0 || !auth.isAuthenticated
              }
            >
              {!auth.isAuthenticated
                ? 'Đăng nhập để tiếp tục'
                : 'Đặt trước ngay'}
            </Button>
            {auth.isAuthenticated && (
              <PreOrderCheckoutModal
                isOpen={isOpen}
                onClose={onClose}
                productData={productData}
              />
            )}
          </Box>
        </Stack>
      </Stack>
      <NeedLoginDialog onClose={loginDis.onClose} isOpen={loginDis.isOpen} />
    </VStack>
  );
};

export default PreOrderProductInfo;
