import RegisterForm from '@/features/Auth/RegisterForm';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const authState = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/');
    }
  }, [authState.isAuthenticated, navigate]);
  return <RegisterForm />;
};

export default Register;
