import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { checkAuth } from "../../services/authService";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../Loading/LoadingPage";

export default function UnifiedProtectedRoute({ children, page }) {
  const token = Cookies.get("token");

  // أعمل checkAuth بس لو فيه token
  const shouldCheckAuth = Boolean(token);

  const { data, isLoading } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkAuth,
    enabled: shouldCheckAuth,
  });

  if (isLoading) return <LoadingPage />;

  // --- صفحة OTP ---
  if (page === "otp") {
    if (token) {
      // لو فيه توكن → يدخل الصفحة بس لو الموبايل مش متفعل
      if (!data?.mobile_verified || data?.next_screen === "mobile_otp") {
        return children;
      }
      // لو الموبايل متفعل → رجعه للصفحة الرئيسية
      return <Navigate to="/" replace />;
    }

    // لو مفيش token → داخل من خطوات التسجيل → اسمحله يدخل
    return children;
  }

  // --- صفحة إكمال التسجيل ---
  if (
    page === "complete_register" &&
    token &&
    data?.next_screen === "complete_register"
  ) {
    return children;
  }

  return <Navigate to="/" replace />;
}
