import LoginForm from '@/features/Auth/LoginForm';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleProvider, auth } from '@/configs/firebase';
import { signInWithPopup } from 'firebase/auth';
import { Button } from '@chakra-ui/react';
const Login = () => {
  const authState = useSelector(state => state.auth);
  const navigate = useNavigate();
  const login = () => {
    return signInWithPopup(auth, googleProvider).then(console.log);
  };
  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/');
    }
  }, [authState.isAuthenticated, navigate]);

  return (
    <>
      <LoginForm />
      <Button onClick={login}>Login with google</Button>
    </>
  );
};

export default Login;
