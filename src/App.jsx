import MainLayout from '@/components/Layout/MainLayout';
import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import SimpleLayout from './components/Layout/SimpleLayout';
import Verify from '@/pages/Verify';
import Register from '@/pages/Register';
import Cart from '@/pages/Cart';
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='cart' element={<Cart />} />
      </Route>
      <Route element={<SimpleLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='verify' element={<Verify />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
