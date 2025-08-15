import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../../services/authService";
import LoadingPage from "../layout/Loading/LoadingPage";
import DisActivePage from "../../pages/NotFound/DisActivePage";

export default function CheckAuthRoute({ children }) {
  const { data, isLoading } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkAuth,
  });

  if (isLoading) return <LoadingPage />;

  if (!data?.mobile_verified || data?.next_screen === "mobile_otp") {
    return <Navigate to="/register-otp" replace />;
  }

  if (data?.next_screen === "complete_register") {
    return <Navigate to="/complete-register" replace />;
  }

  if (data?.next_screen === "dis_active") {
    return <DisActivePage msg={data?.dis_active_message} />;
  }

  return children;
}
