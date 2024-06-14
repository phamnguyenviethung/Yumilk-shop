/* eslint-disable react/prop-types */
import {
  useGetDistrictsQuery,
  useGetProvincesQuery,
  useGetWardsQuery,
} from '@/apis/address';
import PlusIcon from '@/assets/Icon/plus';
import InputField from '@/components/Fields/Input';
import SelectField from '@/components/Fields/Select';
import {
  Button,
  Flex,
  Icon,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';

const AddressSelect = ({ formikProps, provincesData, isProvinceLoading }) => {
  const [province, setProvince] = useState({
    provinceId: '',
    provinceName: '',
    // provinceId: provincesData ? provincesData[0].provinceId : '',
    // provinceName: provincesData ? provincesData[0].provinceName : '',
  });

  const {
    data: districtData,
    isLoading: districtLoading,
    isFetching: districtFetching,
  } = useGetDistrictsQuery(province.provinceId * 1, {
    skip: !province.provinceId,
    refetchOnMountOrArgChange: true,
  });
  const [district, setDistrict] = useState({
    districtId: '',
    districtName: '',
    // districtId: districtData ? districtData[0].districtId : null,
    // districtName: districtData ? districtData[0].districtName : null,
  });
  const {
    data: wardData,
    isLoading: wardLoading,
    isFetching: wardFetching,
  } = useGetWardsQuery(district.districtId * 1, {
    skip: !district.districtId,
    refetchOnMountOrArgChange: true,
  });

  if (
    isProvinceLoading ||
    districtLoading ||
    districtFetching ||
    wardLoading ||
    wardFetching
  )
    return <p>loading...</p>;
  return (
    <>
      <FastField
        component={SelectField}
        name='provinceId'
        label='Tỉnh / Thành Phố'
        value={formikProps.values.provinceId}
        onChange={e => {
          const provinceId = e.target.value * 1;
          formikProps.setFieldValue('provinceId', provinceId);

          const provinceName = provincesData.find(
            p => p.provinceId === provinceId
          ).provinceName;
          formikProps.setFieldValue('provinceName', provinceName);
          setProvince({ provinceId, provinceName });
          formikProps.setFieldValue(
            'districtId',
            districtData ? districtData[0].districtId : ''
          );
        }}
        options={provincesData.map(p => {
          return {
            name: p.provinceName,
            value: String(p.provinceId),
          };
        })}
      />
      <InputGroup>
        <FastField
          component={SelectField}
          name='districtId'
          label='Quận'
          value={formikProps.values.districtId}
          onChange={e => {
            const districtId = e.target.value * 1;
            formikProps.setFieldValue('districtId', districtId);
            const districtName = districtData.find(
              d => d.districtId === districtId
            ).districtName;
            formikProps.setFieldValue('districtName', districtName);
            setDistrict({ districtId, districtName });
          }}
          options={districtData?.map(d => {
            return {
              name: d.districtName,
              value: String(d.districtId),
            };
          })}
        />
        <FastField
          component={SelectField}
          name='wardCode'
          label='Phường'
          value={formikProps.values.wardCode}
          onChange={e => {
            const wardCode = e.target.value * 1;
            formikProps.setFieldValue('wardCode', wardCode);

            const wardName = wardData.find(
              w => w.wardCode === wardCode
            ).wardName;
            formikProps.setFieldValue('wardName', wardName);
          }}
          options={wardData?.map(w => {
            return {
              name: w.wardName,
              value: String(w.wardCode),
            };
          })}
        />
      </InputGroup>
    </>
  );
};

const AddressForm = () => {
  const {
    data: provincesData,
    isLoading: provincesLoading,
    isFetching: provinceFetching,
  } = useGetProvincesQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  if (!provincesLoading && !provinceFetching) {
    return (
      <>
        <Formik
          initialValues={{
            provinceId: '',
            provinceName: '',
            // provinceId: provincesData ? provincesData[0].provinceId : '',
            // provinceName: provincesData ? provincesData[0].provinceName : '',
            districtId: '',
            districtName: '',
            wardCode: '',
            wardName: '',
            receiverName: '',
            receiverPhone: '',
          }}
        >
          {formikProps => {
            console.log(formikProps.values);
            return (
              <VStack as={Form} gap='4'>
                <FastField
                  component={InputField}
                  name='receiverName'
                  label='Tên người nhận'
                  placeholder='Tên người nhận'
                  required
                />
                <FastField
                  component={InputField}
                  name='receiverPhone'
                  label='Số điện thoại'
                  placeholder='Số điện thoại'
                  required
                />
                <AddressSelect
                  formikProps={formikProps}
                  provincesData={provincesData}
                  isProvinceLoading={provincesLoading || provinceFetching}
                />
              </VStack>
            );
          }}
        </Formik>
      </>
    );
  }
};

function AddressModal({ isOpen, onClose }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <AddressForm />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='pink' mr={3}>
              Xác nhận
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const AddAddress = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex justifyContent='flex-end' w='full'>
        <Button
          leftIcon={<Icon as={PlusIcon} color='pink.800' />}
          variant='outline'
          colorScheme='pink'
          onClick={onOpen}
        >
          Thêm mới địa chỉ
        </Button>
      </Flex>
      <AddressModal onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default AddAddress;
