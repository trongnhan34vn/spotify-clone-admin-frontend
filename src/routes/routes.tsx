import { lazy } from 'react';
import CreateAdminPage from '../pages/admins/CreateAdminPage';
import { default as AdminPage } from '../pages/admins/ListAdminPage';
const SignIn = lazy(() => import('../pages/auth/SignIn'));
import Dashboard from '../pages/dashboard/Dashboard';
import GenrePage from '../pages/genres/ListGenrePage';
import NotFound from '../pages/not-found/NotFound';
import ResetPassword from '../pages/reset-password/ResetPassword';
import Unauthorized from '../pages/unauthorized/Unauthorized';
import { RouteName } from './route.name.enum';
import CreateGenrePage from '../pages/genres/CreateGenrePage';

export const routes = [
  // public
  {
    name: RouteName.SIGN_IN,
    path: '/',
    element: <SignIn />,
    private: false,
  },
  {
    name: RouteName.RESET_PASSWORD,
    path: '/reset-password/:username',
    element: <ResetPassword />,
    private: false,
  },
  {
    name: RouteName.UNAUTHORIZED,
    path: '/unauthorized',
    element: <Unauthorized />,
    private: false,
  },
  {
    name: RouteName.NOT_FOUND,
    path: '/not-found',
    element: <NotFound />,
    private: false,
  },
  // private
  {
    name: RouteName.DASHBOARD,
    path: '/dashboard',
    element: <Dashboard />,
    private: true,
  },
  {
    name: RouteName.ADMIN,
    path: '/admin',
    element: <AdminPage />,
    private: true,
  },
  {
    name: RouteName.CREATE_ADMIN,
    path: '/admin/create',
    element: <CreateAdminPage />,
    private: true,
  },
  {
    name: RouteName.GENRE,
    path: '/music/genre',
    element: <GenrePage />,
    private: true,
  },

  {
    name: RouteName.CREATE_GENRE,
    path: '/music/genre/create',
    element: <CreateGenrePage />,
    private: true,
  },
];

const getRouteByName = (name: string) => {
  return routes.find(route => route.name === name);
};

export const getRoutePathByName = (name: string) => {
  const route = getRouteByName(name);
  if (!route) {
    console.error('Route Not Found');
    return getRouteByName(RouteName.NOT_FOUND)?.path ?? "";
  }
  return route.path;
};
