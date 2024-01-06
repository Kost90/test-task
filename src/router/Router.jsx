import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import { PageNotFound } from "../pages/pagenotfound/PageNotFound";
import Map from "../pages/map/Map";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Map />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export { Router };
