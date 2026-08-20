import { createBrowserRouter } from "react-router";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

import Protected from "./features/auth/components/Protected";

import Dashboard from "./features/ai/pages/Dashboard";
import UploadResume from "./features/ai/pages/UploadResume";
import Report from "./features/ai/pages/Report";

import Layout from "./components/Layout";


export const router = createBrowserRouter([

  {
    path: "/login",
    element: <Login />,
  },


  {
    path: "/register",
    element: <Register />,
  },


  {
    path: "/",
    element: (
      <Protected>
        <Layout />
      </Protected>
    ),

    children: [

      {
        index: true,
        element: <Dashboard />,
      },


      {
        path: "upload",
        element: <UploadResume />,
      },


      {
        path: "report/:id",
        element: <Report />,
      },

    ],
  },

]);