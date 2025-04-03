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
import AboutPage from "./pages/About";

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
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/user/ai",
          element: (
            <ProtectedRoute>
              <ChatBot />
            </ProtectedRoute>
          ),
        },
        {
          path: "/user/video",
          element: (
            <ProtectedRoute>
              <Video />
            </ProtectedRoute>
          ),
        },
        {
          path: "/user/meditation",
          element: (
            <ProtectedRoute>
              <Meditation />
            </ProtectedRoute>
          ),
        },
        {
          path: "/user/counsellor",
          element: (
            <ProtectedRoute>
              <Counsellor />
            </ProtectedRoute>
          ),
        },
        {
          path: "/user/screeningtest/catagory",
          element: (
            <ProtectedRoute>
              <Catagory />
            </ProtectedRoute>
          ),
        },
        {
          path: "/user/screeningtest/:testtype",
          element: (
            <ProtectedRoute>
              <ScreeningTest />
            </ProtectedRoute>
          ),
        },
        {
          path: "/user/screeningtest/result/:testtype",
          element: (
            <ProtectedRoute>
              <TestResult />
            </ProtectedRoute>
          ),
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
