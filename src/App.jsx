import NotFound from '@/pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import routes from './configs/routes';
function App() {
  return (
    <Routes>
      {routes.map((route, i) => {
        const Layout = route.layout;

        return (
          <Route key={i} element={<Layout />}>
            {route.data.map(item => {
              const Component = item.component;
              {
                /* const PermissionComponent = item.onlyAdmin
                ? PermissionCheck
                : Fragment; */
              }

              return (
                <Route
                  key={item.path}
                  path={item.path}
                  element={
                    // <PermissionComponent>
                    <Component />
                    // </PermissionComponent>
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
