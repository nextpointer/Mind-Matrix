import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Error } from "./pages/Error";
import { Auth } from "./pages/Auth";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/auth", element: <Auth /> }
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
