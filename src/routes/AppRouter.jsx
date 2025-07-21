import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthLayout from "../pages/AuthPages/AuthLayout";
import Loading from "../components/layout/Loading/Loading";

const Home = React.lazy(() => import("../pages/Home/Home"));
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "create-new-password", element: <CreateNewPassword /> },
      { path: "register-person", element: <RegisterPerson /> },
    ],
  },
]);

const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;
