import axiosInstance from '@/utils/axiosInstance';

const authServices = {
  login: data => {
    const url = '/authentication/login';
    return axiosInstance.post(url, data);
  },
};

export default authServices;
