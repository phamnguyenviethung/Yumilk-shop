import store from '@/configs/store';
import { logout } from '@/features/Auth/authSlice';

export default [
  {
    name: 'Thông tin cá nhân',
    path: '/settings',
  },

  {
    name: 'Đơn hàng',
    path: '/settings',
  },
  {
    name: 'Đăng xuất',
    path: '/',
    handleClick: () => {
      store.dispatch(logout());
    },
  },
];
