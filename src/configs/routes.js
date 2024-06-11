import MainLayout from '@/components/Layout/MainLayout';
import SimpleLayout from '@/components/Layout/SimpleLayout';
import ActiveMail from '@/pages/ActiveMail';
import Cart from '@/pages/Cart';
import ForgotPassword from '@/pages/ForgotPassword';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ResetPassword from '@/pages/ResetPassword';
import Verify from '@/pages/Verify';

const routes = [
  {
    layout: MainLayout,
    data: [
      {
        path: '/',
        isIndex: true,
        component: Home,
      },
      {
        path: '/cart',
        component: Cart,
      },
    ],
  },
  {
    layout: SimpleLayout,
    data: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/register',
        component: Register,
      },
      {
        path: '/verify',
        component: Verify,
      },
      {
        path: '/active-mail',
        component: ActiveMail,
      },
      {
        path: '/reset-password',
        component: ResetPassword,
      },
      {
        path: '/forgot-password',
        component: ForgotPassword,
      },
    ],
  },
];

export default routes;
