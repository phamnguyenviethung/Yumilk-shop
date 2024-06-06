import { useActiveAccountMutation } from '@/apis/authApi';
import { Box } from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Verify = () => {
  const [activeAccount] = useActiveAccountMutation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [isValid, setValid] = useState(false);

  async function checkTokenExpired(t) {
    try {
      const res = jwtDecode(t);
      setValid(res);
    } catch (error) {
      setValid(false);
    }
  }

  const handleSubmitToken = async token => {
    try {
      const res = await activeAccount(token);
      if (res.error) throw res.error.data;
    } catch (error) {
      console.log('Verify error', error);
    }
  };

  useEffect(() => {
    if (token) {
      checkTokenExpired(token);
      handleSubmitToken(token);
    }
  }, [token]);

  return (
    <Box>
      {isValid ? (
        <Box>Xac nhan thanh cong</Box>
      ) : (
        <Box>Da het han hoac khong hop le </Box>
      )}
    </Box>
  );
};

export default Verify;
