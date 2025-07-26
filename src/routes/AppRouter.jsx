import React, { Suspense } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import App from "../App";
import Loading from "../components/layout/Loading/Loading";

const Home = React.lazy(() => import("../pages/Home/Home"));
const Purchase = React.lazy(() => import("../pages/Home/Purchase"));
const Sale = React.lazy(() => import("../pages/Home/Sale"));
const AddDamana = React.lazy(() => import("../pages/AddDamana/AddDamana"));
const DamanaDetails = React.lazy(() =>
  import("../pages/DamanaDetails/DamanaDetails")
);
const LoginPage = React.lazy(() =>
  import("../pages/AuthPages/LoginPage/LoginPage")
);
const ForgotPassword = React.lazy(() =>
  import("../pages/AuthPages/ForgotPassword/ForgotPassword")
);
const ResetPassword = React.lazy(() =>
  import("../pages/AuthPages/ForgotPassword/ResetPassword")
);
const CreateNewPassword = React.lazy(() =>
  import("../pages/AuthPages/ForgotPassword/CreateNewPassword")
);
const RegisterPerson = React.lazy(() =>
  import("../pages/AuthPages/Register/RegisterPerson/RegisterPerson")
);
import RegisterCompany from "../pages/AuthPages/Register/RegisterCompany/RegisterCompany";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="sale" replace />, // <-- هنا التحويل
      },
      {
        path: "",
        element: <Home />,
        children: [
          { path: "sale", element: <Sale /> }, // الصفحة الأساسية
          { path: "purchase", element: <Purchase /> }, // التانية
        ],
      },
      { path: "add-damana", element: <AddDamana /> },
      { path: "damana", element: <DamanaDetails /> },
    ],
  },

  { path: "login", element: <LoginPage /> },
  { path: "forgot-password", element: <ForgotPassword /> },
  { path: "reset-password", element: <ResetPassword /> },
  { path: "create-new-password", element: <CreateNewPassword /> },
  { path: "register-person", element: <RegisterPerson /> },
  { path: "register-company", element: <RegisterCompany /> },
]);

const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;
