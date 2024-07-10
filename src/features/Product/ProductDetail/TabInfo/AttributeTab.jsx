import { useGetAttributeValueByIdQuery } from '@/apis/productApi';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const AttributeTab = () => {
  const { id } = useParams();
  const { data: attributeValues } = useGetAttributeValueByIdQuery(id);
  return (
    <>
      {Array.isArray(attributeValues?.items) ? (
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Thuộc tính</Th>
              <Th>Giá trị</Th>
            </Tr>
          </Thead>
          <Tbody>
            {attributeValues.items.map((item, index) => (
              <Tr key={index}>
                <Td>{item.attributeName}</Td>
                <Td>{item.value}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : null}
    </>
  );
};

export default AttributeTab;
