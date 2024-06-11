import store from '@/configs/store';
import { logout } from '@/features/Auth/authSlice';

export default [
  {
    name: 'Tài khoản',
    path: '/',
  },
  {
    name: 'Địa chỉ',
    path: '/',
  },
  {
    name: 'Đơn hàng',
    path: '/',
  },
  {
    name: 'Đăng xuất',
    path: '/',
    handleClick: () => {
      store.dispatch(logout());
    },
  },
];
