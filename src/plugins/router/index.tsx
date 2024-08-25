// import store from '../redux/index';
// import React, { Suspense, lazy } from 'react';
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';

// export function getRoutesFromContainer(context) {
//   let routes = [];
//   context.keys().forEach((path) => {
//     routes.push(context(`${path}`).default);
//     if (context(`${path}`).childRoutes) {
//       context(`${path}`).childRoutes.forEach((childRoute) => {
//         routes.push(childRoute);
//       });
//     }
//   });
//   return routes;
// }

// const appContext = require.context('../containers/app', true, /route.js$/);
// const authenticationContext = require.context(
//   '../containers/authentication',
//   true,
//   /route.js$/,
// );

// export const appRoutes = getRoutesFromContainer(appContext);
// export const authenticationRoutes = getRoutesFromContainer(
//   authenticationContext,
// );
// export const listAppRoutes = appRoutes.map((item) => {
//   return {
//     path: item.path,
//     exactContainer: item?.exactContainer ?? true,
//   };
// });
// export const listAuthenticationRoutes = authenticationRoutes.map((item) => {
//   return {
//     path: item.path,
//     exactContainer: item?.exactContainer ?? true,
//   };
// });

// export const initModules = async (modules = [], container = 'app') => {
//   await Promise.all([
//     modules.map(async (item) => {
//       const [reducer, saga] = await Promise.all([
//         import(`../containers/${container}/screens/${item.path}/reducer`),
//         import(`../containers/${container}/screens/${item.path}/saga`),
//       ]);
//       store.injectReducer(item.key, reducer.default);
//       store.injectSaga(item.key, saga.default);
//     }),
//   ]);

//   return 'ok';
// };

// // export const initModule

import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import type { Router } from '@remix-run/router';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { lazy, Suspense } from 'react';
import { lazyLoad } from '@utils/loadable';
import LayoutMenu from '@app/LayoutMenu';

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
    LazyComponent: lazyLoad(async () => import('@app/LayoutMenu')),
    children: [
      {
        isPrivate: false,
        path: 'dashboard',
        name: RouteNames.DASHBOARD,
        component: <div>Dashboard</div>,
        // LazyComponent: lazyLoad(
        //   async () => import('@app/pages/Dashboard'),
        // ),
      },
      {
        isPrivate: false,
        path: 'settings',
        name: RouteNames.SETTING,
        component: <div>Setting</div>,
        // LazyComponent: lazyLoad(
        //   async () => import('@app/pages/Dashboard'),
        // ),
      },
      {
        isPrivate: false,
        path: 'fields',
        name: RouteNames.FIELD,
        LazyComponent: lazyLoad(async () => import('@app/pages/Field/index')),
      },
    ],
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
