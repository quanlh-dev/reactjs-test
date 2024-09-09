import ErrorBoundary from '@components/Error/ErrorBoundary';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';
import { router } from './plugins/router';

const materialTheme = createTheme({
  palette: {
    primary: {
      main: '#BE7530',
    },
  },
});
function App() {
  const { i18n } = useTranslation();

  return (
    <ErrorBoundary catchErrors="always">
      <React.Suspense fallback={<span>Loading</span>}>
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
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default App;
