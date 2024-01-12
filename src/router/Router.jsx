import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import { PageNotFound } from "../pages/pagenotfound/PageNotFound";
import Mappage from "../pages/mappage/Mappage";
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
        element: <Mappage />,
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
