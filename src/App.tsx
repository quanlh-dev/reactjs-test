// import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
// import { auth } from './redux/actions/user';
// import PrivateRoute from './containers/PrivateRoute';
import { Spin } from 'antd';
// import { listAppRoutes, listAuthenticationRoutes } from 'router';
import { router } from './plugins/router';
import { GlobalStyle } from '@styles/global-styles';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from '@components/Error/ErrorBoundary';
import { selectors, selectorMapKey } from '@plugins/store/helpers/selectors';
import { useSelector } from '@utils/hooks';
// console.log('listAppRoutes =>', listAppRoutes);
// console.log('listAuthenticationRoutes =>', listAuthenticationRoutes);

// initLocalStorage();

function App() {
  const dispatch = useDispatch();
  // const { isAuthRequesting } = useSelector((state) => state.user);
  useEffect(() => {
    // debugger
    // dispatch(auth());
    console.log('authenticating...');
  }, [dispatch]);
  const { i18n } = useTranslation();
  // const  = useNavigation();
  console.log("selectors['profile'] =>", selectors);
  // debugger;

  // const x = useSelector(selectors['theme'] as any);
  // console.log('x =>', x);

  console.log('selectorMapKey', selectorMapKey);

  const theme = useSelector((state) => state.theme?.selected);
  console.log('theme =>', theme);

  return (
    <ErrorBoundary catchErrors="always">
      <React.Suspense fallback={<Spin />}>
        <Helmet
          titleTemplate="%s - React Boilerplate"
          defaultTitle="React Boilerplate"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="A React Boilerplate application" />
        </Helmet>
        <RouterProvider router={router}></RouterProvider>
        {/* <Routes>
          <Route path="*" element={<div>Hello world1</div>} />
        </Routes> */}
        <GlobalStyle />
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default App;
