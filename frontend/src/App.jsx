import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Error } from "./pages/Error";
import { Login } from "./pages/Login";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/user/login", element: <Login /> }
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
