import NotFound from '@/pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import routes from './configs/routes';
import AuthCheck from './components/Auth/AuthCheck';
function App() {
  return (
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
  );
}

export default App;
