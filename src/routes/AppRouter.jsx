import React, { Suspense } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import App from "../App";
import LoadingPage from "../components/layout/Loading/LoadingPage";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "../components/ProtectedRoute/GuestRoute";
import CheckAuthRoute from "../components/ProtectedRoute/CheckAuthRoute";

const Home = React.lazy(() => import("../pages/Home/Home"));
const AddDamana = React.lazy(() => import("../pages/AddDamana/AddDamana"));
const DamanaDetails = React.lazy(() =>
  import("../pages/DamanaDetails/DamanaDetails")
);
const PaymentOptions = React.lazy(() =>
  import("../pages/PaymentOptions/PaymentOptions")
);
const NotificationsPage = React.lazy(() =>
  import("../pages/NotificationsPage/NotificationsPage")
);
const LoginPage = React.lazy(() =>
  import("../pages/AuthPages/LoginPage/LoginPage")
);
const ForgotPassword = React.lazy(() =>
  import("../pages/AuthPages/ForgotPassword/ForgotPassword")
);
const RegisterCompany = React.lazy(() =>
  import("../pages/AuthPages/Register/RegisterCompany/RegisterCompany")
);
const RegisterPerson = React.lazy(() =>
  import("../pages/AuthPages/Register/RegisterPerson/RegisterPerson")
);
const RegisterOTP = React.lazy(() =>
  import("../pages/AuthPages/Register/RegisterPerson/OTP")
);
const CompleteRegister = React.lazy(() =>
  import(
    "../pages/AuthPages/Register/RegisterPerson/CompleteRegister/CompleteRegister"
  )
);
const Dashboard = React.lazy(() => import("../pages/Dashboard/Dashboard"));
const GetPage = React.lazy(() => import("../pages/GetPage/GetPage"));

const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));

const Account = React.lazy(() => import("../pages/Account/Account"));
const Profile = React.lazy(() => import("../pages/Account/Profile/Profile"));
const BankInfo = React.lazy(() => import("../pages/Account/BankInfo"));
const Address = React.lazy(() => import("../pages/Account/Address"));
const Support = React.lazy(() => import("../pages/Account/Support"));
const Password = React.lazy(() => import("../pages/Account/Password"));
const RemoveDamana = React.lazy(() => import("../pages/Account/RemoveDamana"));
const Terms = React.lazy(() => import("../pages/Account/Terms"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <CheckAuthRoute>
          <App />
        </CheckAuthRoute>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="damanaty/sale" replace />,
      },
      {
        path: "/damanaty/*",
        element: <Home />,
      },
      { path: "/dashboard/*", element: <Dashboard /> },
      { path: "add-damana", element: <AddDamana /> },
      { path: "damana/:id", element: <DamanaDetails /> },
      { path: "payment-options", element: <PaymentOptions /> },
      { path: "page/:page", element: <GetPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      {
        path: "profile",
        element: <Account />,
        children: [
          { index: true, element: <Profile /> },
          { path: "bank-info", element: <BankInfo /> },
          { path: "address", element: <Address /> },
          { path: "support", element: <Support /> },
          { path: "password", element: <Password /> },
          { path: "remove-damana", element: <RemoveDamana /> },
          { path: "terms", element: <Terms /> },
        ],
      },
    ],
  },
  {
    path: "login",
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: "forgot-password",
    element: (
      <GuestRoute>
        <ForgotPassword />
      </GuestRoute>
    ),
  },
  {
    path: "register-company",
    element: (
      <GuestRoute>
        <RegisterCompany />
      </GuestRoute>
    ),
  },
  {
    path: "register-person",
    element: (
      <GuestRoute>
        <RegisterPerson />
      </GuestRoute>
    ),
  },
  {
    path: "register-otp",
    element: (
      <GuestRoute>
        <RegisterOTP />
      </GuestRoute>
    ),
  },
  {
    path: "complete-register",
    element: (
      <GuestRoute>
        <CompleteRegister />
      </GuestRoute>
    ),
  },

  { path: "*", element: <NotFound /> },
]);

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;
