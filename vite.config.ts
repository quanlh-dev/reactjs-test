import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 2023,
    open: './',
  },
  // optimizeDeps: {
  //   exclude: [
  //     '@fortawesome/fontawesome-free',
  //     '@fortawesome/react-fontawesome',
  //     '@fortawesome/free-solid-svg-icons',
  //     '@fortawesome/fontawesome-svg-core',
  //   ],
  // },
  resolve: {
    alias: [
      {
        find: '@plugins/store',
        replacement: path.resolve(__dirname, 'src/plugins/store'),
      },
      {
        find: '@styles',
        replacement: path.resolve(__dirname, 'src/styles'),
      },
      {
        find: '@authentication',
        replacement: path.resolve(__dirname, 'src/containers/authentication'),
      },
      {
        find: '@app',
        replacement: path.resolve(__dirname, 'src/containers/app'),
      },
      {
        find: '@utils',
        replacement: path.resolve(__dirname, 'src/utils'),
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: '@containers',
        replacement: path.resolve(__dirname, 'src/containers'),
      },
      {
        find: '@assets',
        replacement: path.resolve(__dirname, 'src/assets'),
      },
      {
        find: '@constants',
        replacement: path.resolve(__dirname, 'src/constants'),
      },
      {
        find: '@locales',
        replacement: path.resolve(__dirname, 'src/locales'),
      },
      {
        find: '@types',
        replacement: path.resolve(__dirname, 'src/types'),
      },
    ],
  },
});
