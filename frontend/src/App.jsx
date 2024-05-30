// src/App.js

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Root } from './Root';
import { Home } from './pages/Home';
import { Error } from './pages/Error';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Register } from './pages/Register';
import { ChatBot } from './pages/ChatBot';
import { Catagory } from './pages/Catagory';
import { ScreeningTest } from './pages/ScreeningTest';
import { TestResult } from './pages/TestResult';
import { Music } from './pages/Music';
import { Counsellor } from './pages/Counsellor';
import { AuthProvider } from './authContext';
import { Meditation } from './pages/Meditation';
import { Video } from './pages/Video';
// import ProtectedRoute from './lib/ProtectedRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <Error />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/user/login', element: <Login /> },
        { path: '/user/register', element: <Register /> },
        {
          path: '/user/dashboard',
          element: (
            
              <Dashboard />
            
          ),
        },
        {
          path: '/user/ai',
          element: (
            
              <ChatBot/>
            
          ),
        },
        {
          path: '/user/music',
          element: (
            
              <Music />
            
          ),
        },
        {
          path: '/user/video',
          element: (
            
              <Video />
            
          ),
        },
        {
          path: '/user/meditation',
          element: (
            
              <Meditation/>
            
          ),
        },
        {
          path: '/user/counsellor',
          element: (
           
              <Counsellor />
            
          ),
        },
        {
          path: '/user/screeningtest/catagory',
          element: (
            
              <Catagory />
            
          ),
        },
        {
          path: '/user/screeningtest/:testtype',
          element: (
            
              <ScreeningTest />
           
          ),
        },
        {
          path: '/user/screeningtest/result/:testtype',
          element: (
            
              <TestResult />
            
          ),
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
