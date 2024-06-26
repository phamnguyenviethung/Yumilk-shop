import MainLayout from '@/components/Layout/MainLayout';
import SimpleLayout from '@/components/Layout/SimpleLayout';
import ActiveMail from '@/pages/ActiveMail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import ForgotPassword from '@/pages/ForgotPassword';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import OrderDetail from '@/pages/OrderDetail';
import ProductDetail from '@/pages/ProductDetail';
import Register from '@/pages/Register';
import ResetPassword from '@/pages/ResetPassword';
import Search from '@/pages/Search';
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
        path: '/active-mail',
        component: ActiveMail,
        auth: {
          shouldLogin: true,
        },
      },
      {
        path: '/cart',
        component: Cart,
        auth: {
          shouldLogin: true,
        },
      },
      {
        path: '/checkout',
        component: Checkout,
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
      {
        path: '/product/:id',
        component: ProductDetail,
        auth: {
          shouldLogin: false,
        },
      },
      {
        path: '/search',
        component: Search,
        auth: {
          shouldLogin: false,
        },
      },
      {
        path: '/order/:id',
        component: OrderDetail,
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
