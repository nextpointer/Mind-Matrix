import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Error } from "./pages/Error";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Register } from "./pages/Register";
import { ChatBot } from "./pages/ChatBot";
import { Catagory } from "./pages/Catagory";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/user/login", element: <Login /> },
        { path: "/user/register", element: <Register/> },
        { path: "/user/dashboard", element: <Dashboard/> },
        { path: "/user/ai", element: <ChatBot/> },
        { path: "/user/screeningtest/catagory", element: <Catagory/> }
        // { path: "/user/screeningtest/:testtype", element: </> },



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
