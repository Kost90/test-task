import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import { PageNotFound } from "../pages/pagenotfound/PageNotFound";
import Map from "../pages/map/Map";
import AnnounceDetails from "../pages/announcedetails/AnnounceDetails";
import { AnnounceDetailsLoader } from "../pages/announcedetails/AnnounceDetailsLoader";

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
      {
        path:'announce/:id',
        element:<AnnounceDetails/>,
        loader:AnnounceDetailsLoader,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export { Router };
