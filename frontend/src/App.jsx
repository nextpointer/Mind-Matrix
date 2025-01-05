// src/App.js

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Error } from "./pages/Error";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Register } from "./pages/Register";
import { ChatBot } from "./pages/ChatBot";
import { Catagory } from "./pages/Catagory";
import { ScreeningTest } from "./pages/ScreeningTest";
import { TestResult } from "./pages/TestResult";
import { Counsellor } from "./pages/Counsellor";
import { Meditation } from "./pages/Meditation";
import { Video } from "./pages/Video";
import ProtectedRoute from "./lib/ProtectedRoute";
import { AuthProvider } from "./lib/userContext.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/user/login", element: <Login /> },
        { path: "/user/register", element: <Register /> },
        {
          path: "/user/dashboard",
          element: (
            <AuthProvider>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </AuthProvider>
          ),
        },
        {
          path: "/user/ai",
          element: (
            <AuthProvider>
              <ProtectedRoute>
                <ChatBot />
              </ProtectedRoute>
            </AuthProvider>
          ),
        },
        {
          path: "/user/video",
          element: (
            <AuthProvider>
              <ProtectedRoute>
                <Video />
              </ProtectedRoute>
            </AuthProvider>
          ),
        },
        {
          path: "/user/meditation",
          element: (
            <AuthProvider>
              <ProtectedRoute>
                <Meditation />
              </ProtectedRoute>
            </AuthProvider>
          ),
        },
        {
          path: "/user/counsellor",
          element: (
            <AuthProvider>
              <ProtectedRoute>
                <Counsellor />
              </ProtectedRoute>
            </AuthProvider>
          ),
        },
        {
          path: "/user/screeningtest/catagory",
          element: (
            <AuthProvider>
              <ProtectedRoute>
                <Catagory />
              </ProtectedRoute>
            </AuthProvider>
          ),
        },
        {
          path: "/user/screeningtest/:testtype",
          element: (
            <AuthProvider>
              <ProtectedRoute>
                <ScreeningTest />
              </ProtectedRoute>
            </AuthProvider>
          ),
        },
        {
          path: "/user/screeningtest/result/:testtype",
          element: (
            <AuthProvider>
              <ProtectedRoute>
                <TestResult />
              </ProtectedRoute>
            </AuthProvider>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
