/* eslint-disable react/prop-types */
import {
  useGetDistrictsQuery,
  useGetProvincesQuery,
  useGetWardsQuery,
} from '@/apis/address';
import {
  useAddNewAddressMutation,
  useUpdateMyAddressMutation,
} from '@/apis/customerApi';
import InputField from '@/components/Fields/Input';
import SelectField from '@/components/Fields/Select';
import {
  Button,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import { useRef } from 'react';
import * as yup from 'yup';

const AddressSelect = ({ formikProps }) => {
  const {
    data: provincesData,
    isLoading: provincesLoading,
    isFetching: provinceFetching,
  } = useGetProvincesQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const {
    data: districtData,
    isLoading: districtLoading,
    isFetching: districtFetching,
  } = useGetDistrictsQuery(formikProps.values.provinceId * 1, {
    skip: !formikProps.values.provinceId,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: wardData,
    isLoading: wardLoading,
    isFetching: wardFetching,
  } = useGetWardsQuery(formikProps.values.districtId * 1, {
    skip: !formikProps.values.districtId,
    refetchOnMountOrArgChange: true,
  });

  if (
    provincesLoading ||
    provinceFetching ||
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
          formikProps.setFieldValue('districtId', '');
          formikProps.setFieldValue('districtName', '');
          formikProps.setFieldValue('wardId', '');
          formikProps.setFieldValue('wardName', '');
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
            formikProps.setFieldValue('wardId', '');
            formikProps.setFieldValue('wardName', '');
          }}
          options={
            formikProps.values.provinceId === ''
              ? []
              : districtData?.map(d => {
                  return {
                    name: d.districtName,
                    value: String(d.districtId),
                  };
                })
          }
        />
        <FastField
          component={SelectField}
          name='wardId'
          label='Phường'
          value={formikProps.values.wardId}
          onChange={e => {
            const wardId = e.target.value * 1;
            formikProps.setFieldValue('wardId', wardId);

            const wardName = wardData.find(w => w.wardCode === wardId).wardName;
            formikProps.setFieldValue('wardName', wardName);
          }}
          options={
            formikProps.values.distirctId === ''
              ? []
              : wardData?.map(w => {
                  return {
                    name: w.wardName,
                    value: String(w.wardCode),
                  };
                })
          }
        />
      </InputGroup>
    </>
  );
};

const AddressForm = ({ onClose, addressData, type }) => {
  const [addNewAddressAPI, { isLoading: addLoading }] =
    useAddNewAddressMutation();
  const [updateAddressAPI, { isLoading: updateLoading }] =
    useUpdateMyAddressMutation();
  const validationSchema = yup.object().shape({
    receiverName: yup.string().required('Vui lòng không bỏ trống'),
    address: yup.string().required('Vui lòng không bỏ trống'),

    receiverPhone: yup
      .string()
      .length(10, 'Số điện thoại phải là 10 số')
      .required('Vui lòng không bỏ trống'),
    provinceId: yup.string().required('Vui lòng không bỏ trống'),
    districtId: yup.string().required('Vui lòng không bỏ trống'),
    wardId: yup.string().required('Vui lòng không bỏ trống'),
  });
  const toast = useToast();
  const initValues = {
    provinceId: '',
    provinceName: '',
    districtId: '',
    districtName: '',
    wardId: '',
    wardName: '',
    receiverName: '',
    receiverPhone: '',
    address: '',
    isDefault: false,
  };
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={
        type === 'add'
          ? initValues
          : { ...addressData, wardId: addressData.wardCode }
      }
      onSubmit={async data => {
        try {
          const run = type === 'add' ? addNewAddressAPI : updateAddressAPI;
          const res = await run(data);
          if (res.error) throw res.error.data;
          onClose();
          toast({
            title: 'Thành công',
            status: 'success',
            duration: 2500,
            isClosable: true,
            position: 'top-right',
          });
        } catch (err) {
          console.log(err);
          toast({
            title: err.message,
            status: 'error',
            duration: 2500,
            isClosable: true,
            position: 'top-right',
          });
        }
      }}
    >
      {formikProps => {
        return (
          <VStack as={Form} w='full'>
            <ModalBody pb={6}>
              <VStack gap='4'>
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
                <FastField
                  component={InputField}
                  name='address'
                  label='Số nhà - Đường'
                  placeholder='Số nhà - Đường'
                  required
                />
                <AddressSelect formikProps={formikProps} />
              </VStack>
            </ModalBody>
            <ModalFooter w='full'>
              <Button
                type='submit'
                colorScheme='pink'
                mr={3}
                isLoading={addLoading || updateLoading}
                justifySelf='flex-end'
              >
                Xác nhận
              </Button>
            </ModalFooter>
          </VStack>
        );
      }}
    </Formik>
  );
};

function AdressEditModal({ isOpen, onClose, type, addressData }) {
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
          <ModalHeader>Địa chỉ</ModalHeader>
          <ModalCloseButton />
          <AddressForm
            onClose={onClose}
            type={type}
            addressData={addressData}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
export default AdressEditModal;
