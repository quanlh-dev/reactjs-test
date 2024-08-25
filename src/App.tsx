import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Spin } from 'antd';
import ErrorBoundary from '@components/Error/ErrorBoundary';
import { GlobalStyle } from '@styles/global-styles';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { router } from './plugins/router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const materialTheme = createTheme({
  palette: {
    primary: {
      main: '#BE7530',
    },
  },
});
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('authenticating...');
  }, [dispatch]);
  const { i18n } = useTranslation();

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
        <ThemeProvider theme={materialTheme}>
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
        <GlobalStyle />
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default App;
