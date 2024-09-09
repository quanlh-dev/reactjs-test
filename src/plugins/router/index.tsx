import type { Router } from '@remix-run/router';
import { lazyLoad } from '@utils/loadable';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import PublicRoute from './PublicRoute';

export enum RouteNames {
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
    component: <Navigate to={'/field'} />,
  },
  {
    isPrivate: false, // TODO:
    path: 'field',
    name: RouteNames.FIELD,
    LazyComponent: lazyLoad(async () => import('@app/pages/Field/index')),
  },
];

const convertRoute = (route: RouteConfig): RouteObject => {
  const { name, path, component, LazyComponent, action, loader, children } =
    route as IRouteConfig;

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
    MyElement = (
      <PublicRoute>
        <LazyComponent />
      </PublicRoute>
    );
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
