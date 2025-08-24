import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { checkAuth } from "../../services/authService";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../layout/Loading/LoadingPage";

export default function UnifiedProtectedRoute({ children }) {
  const token = Cookies.get("token");

  const { data, isLoading } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkAuth,
  });

  console.log(data);

  if (isLoading) return <LoadingPage />;

  if (token && data?.next_screen === "normal") {
    return <Navigate to="/" replace />;
  }

  return children;
}
