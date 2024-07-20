import NotFound from '@/pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import routes from './configs/routes';
import AuthCheck from './components/Auth/AuthCheck';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMeQuery } from './apis/customerApi';
import { updateUserData } from './features/Auth/authSlice';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './configs/firebase';
import ScrollToTop from './components/ScrollToTop';
import { useReloadCartMutation } from './apis/cartApi';
function App() {
  const authState = useSelector(state => state.auth);
  const [reloadCartAPI] = useReloadCartMutation();

  const { data, isLoading } = useGetMeQuery(authState, {
    skip: !authState?.isAuthenticated,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoading && authState?.isAuthenticated) {
      dispatch(updateUserData(data));
    }
  }, [isLoading, data, dispatch, authState?.isAuthenticated]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      signOut(auth);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const run = async () => {
      try {
        await reloadCartAPI(authState?.userData?.userID);
      } catch (error) {
        console.log(error);
      }
    };
    if (authState?.isAuthenticated) {
      run();
    }
  }, [authState?.isAuthenticated, authState?.userData?.userID, reloadCartAPI]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {routes.map((route, i) => {
          const Layout = route.layout;

          return (
            <Route key={i} element={<Layout />}>
              {route.data.map(item => {
                const Component = item.component;
                return (
                  <Route
                    key={item.path}
                    path={item.path}
                    element={
                      <AuthCheck
                        shouldLogin={item?.auth?.shouldLogin}
                        shouldLogout={item?.auth?.shouldLogout}
                      >
                        <Component />
                      </AuthCheck>
                    }
                  />
                );
              })}
            </Route>
          );
        })}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
