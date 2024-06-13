import MainLayout from '@/components/Layout/MainLayout';
import SimpleLayout from '@/components/Layout/SimpleLayout';
import ActiveMail from '@/pages/ActiveMail';
import Cart from '@/pages/Cart';
import ForgotPassword from '@/pages/ForgotPassword';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ResetPassword from '@/pages/ResetPassword';
import Settings from '@/pages/Settings';
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
        auth: {
          shouldLogin: true,
        },
      },
      {
        path: '/settings',
        component: Settings,
        auth: {
          shouldLogin: true,
        },
      },
    ],
  },
  {
    layout: SimpleLayout,
    data: [
      {
        path: '/login',
        component: Login,
        auth: {
          shouldLogout: true,
        },
      },
      {
        path: '/register',
        component: Register,
        auth: {
          shouldLogout: true,
        },
      },
      {
        path: '/verify',
        component: Verify,
        auth: {
          shouldLogout: true,
        },
      },
      {
        path: '/active-mail',
        component: ActiveMail,
        auth: {
          shouldLogout: true,
        },
      },
      {
        path: '/reset-password',
        component: ResetPassword,
        auth: {
          shouldLogout: true,
        },
      },
      {
        path: '/forgot-password',
        component: ForgotPassword,
        auth: {
          shouldLogout: true,
        },
      },
    ],
  },
];

export default routes;