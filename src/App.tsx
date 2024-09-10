import ErrorBoundary from '@components/Error/ErrorBoundary';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
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
  return (
    <ErrorBoundary catchErrors="always">
      <React.Suspense fallback={<span>Loading</span>}>
        <ThemeProvider theme={materialTheme}>
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default App;
