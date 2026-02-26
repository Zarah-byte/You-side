import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/HomePage';
import { AlbumPage } from './pages/AlbumPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/album/:albumId',
    Component: AlbumPage,
  },
]);
