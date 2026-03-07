import { createHashRouter } from 'react-router-dom';
import Home from './pages/Home';
import CardioCase from './pages/CardioCase';
import InternalCase from './pages/InternalCase';
import BothCase from './pages/BothCase';
import Settings from './pages/Settings';
import Cases from './pages/Cases';

export const router = createHashRouter([
  { path: '/', element: <Home /> },
  { path: '/cardio', element: <CardioCase /> },
  { path: '/internal', element: <InternalCase /> },
  { path: '/both', element: <BothCase /> },
  { path: '/cases', element: <Cases /> },
  { path: '/settings', element: <Settings /> },
]);
