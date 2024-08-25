import type { Router } from '@remix-run/router';
import { lazyLoad } from '@utils/loadable';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export enum RouteNames {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  SETTING = 'SETTING',
  ROOT = 'ROOT',
  FIELD = 'FIELD',
}

const DEFAULT_ROUTE_CONFIG: RouteConfig = {
  isPrivate: false,
};

export const routes: RouteConfig[] = [
  {
    isPrivate: false,
    path: '/',
    name: RouteNames.ROOT,
    component: <Navigate to={'/app'} />,
  },
  {
    isPrivate: false,
    path: 'login',
    name: RouteNames.LOGIN,
    LazyComponent: lazyLoad(async () => import('@authentication/pages/Login')),
  },
  {
    isPrivate: false, // TODO:
    path: 'app',
    name: RouteNames.HOME,
    LazyComponent: lazyLoad(async () => import('@app/pages/Field/index')),
  },
];

const convertRoute = (route: RouteConfig): RouteObject => {
  const {
    name,
    path,
    component,
    LazyComponent,
    action,
    loader,
    children,
    isPrivate,
  } = route as IRouteConfig;

  const routeObject: RouteObject = {
    path,
    element: <div>Not found</div>,
    loader,
    action,
    children: children?.map((r) => convertRoute(r)),
  };

  let MyElement: React.ReactNode;
  if (component) {
    routeObject.element = component;
  } else {
    if (isPrivate) {
      MyElement = (
        <PrivateRoute>
          <LazyComponent />
        </PrivateRoute>
      );
    } else {
      MyElement = (
        <PublicRoute>
          <LazyComponent />
        </PublicRoute>
      );
    }
    routeObject.element = MyElement;
  }

  return routeObject;
};

export const router: Router = createBrowserRouter(
  routes?.map((r) => {
    const route = { ...DEFAULT_ROUTE_CONFIG, ...r };
    console.log('convertRoute(route)', convertRoute(route));
    return convertRoute(route);
  }),
);
