import ErrorPage from 'pages/ErrorPage';
import { createBrowserRouter } from 'react-router-dom';

import SignIn from 'pages/SingIn';
import SignUp from 'pages/SignUp';
import AuthTemplate from 'templates/AuthTemplate';
import ProjectTemplate from 'templates/ProjectTemplate';
import ProjectManagement from 'pages/ProjectManagement';
import ProjectBoard from 'pages/ProjectBoard';
import ProjectCreate from 'pages/ProjectCreate';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthTemplate />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '/project',
    element: <ProjectTemplate />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ProjectManagement />,
      },
      {
        path: 'management',
        element: <ProjectManagement />,
      },
      {
        path: 'board/:projectId',
        element: <ProjectBoard />,
      },
      {
        path: 'create',
        element: <ProjectCreate />,
      },
    ],
  },
]);
