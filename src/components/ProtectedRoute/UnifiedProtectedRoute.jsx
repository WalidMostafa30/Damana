import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { checkAuth } from "../../services/authService";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../Loading/LoadingPage";

export default function UnifiedProtectedRoute({ children, page }) {
  const token = Cookies.get("token");

  const { data, isLoading } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkAuth,
  });

  if (isLoading) return <LoadingPage />;

  if (
    page === "otp" &&
    token &&
    (!data?.mobile_verified || data?.next_screen === "mobile_otp")
  ) {
    return children;
  }

  if (
    page === "complete_register" &&
    token &&
    data?.next_screen === "complete_register"
  ) {
    return children;
  }

  return <Navigate to="/" replace />;
}
