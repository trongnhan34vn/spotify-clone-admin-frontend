import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { routes } from './routes';
import AppLayout from '../layouts/AppLayout';

const AppRoutes = () => {
  const publicRoutes = routes.filter(r => !r.private);
  const privateRoutes = routes.filter(r => r.private);
  return (
    <Routes>
      {/* Public routes */}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Private routes wrapper */}
      {privateRoutes.length > 0 && (
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            {privateRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        </Route>
      )}
    </Routes>
  );
};

export default AppRoutes;
