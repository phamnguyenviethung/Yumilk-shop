import store from '@/configs/store';
import { logout } from '@/features/Auth/authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '@/configs/firebase';

export const noAuthData = [
  {
    name: 'Đăng nhập',
    path: '/login',
  },
  {
    name: 'Đăng ký',
    path: '/register',
  },
];

export default [
  {
    name: 'Thông tin cá nhân',
    path: '/settings',
  },

  {
    name: 'Đơn hàng',
    path: '/settings?id=2',
  },
  {
    name: 'Đăng xuất',
    path: '/',
    handleClick: () => {
      store.dispatch(logout());
      signOut(auth);
    },
  },
];
