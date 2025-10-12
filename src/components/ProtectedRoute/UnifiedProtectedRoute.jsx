import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { checkAuth } from "../../services/authService";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../Loading/LoadingPage";
import { useDispatch } from "react-redux";
import ActionModal from "../modals/ActionModal";
import { closeLogoutModal } from "../../store/modalsSlice/logoutModalSlice";
import { useTranslation } from "react-i18next";

export default function UnifiedProtectedRoute({ children, page }) {
  const token = Cookies.get("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // أعمل checkAuth بس لو فيه token
  const shouldCheckAuth = Boolean(token);

  const { data, isLoading, error } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkAuth,
    enabled: shouldCheckAuth,
  });

  if (isLoading) return <LoadingPage />;

  if (error)
    return (
      <ActionModal
        openModal={true}
        msg={
          <>
            <h2 className="text-xl font-bold">
              {t("components.protectedRoutes.checkAuthRoute.sessionEnded")}
            </h2>
            <p>
              {t("components.protectedRoutes.checkAuthRoute.sessionExpired")}
            </p>
          </>
        }
        icon="warning"
        primaryBtn={{
          text: t("components.protectedRoutes.checkAuthRoute.goToLogin"),
          action: () => {
            dispatch(closeLogoutModal());
            navigate("/login");
            Cookies.remove("token");
          },
        }}
      />
    );

  // --- صفحة OTP ---
  if (page === "otp") {
    if (token) {


            if ( 
        data?.account_type  == "company" 
      ) {


        if (  !data?.email_verified  &&   !data?.mobile_verified ) {
          return children;
        }



      }else {

        
      // لو فيه توكن → يدخل الصفحة بس لو الموبايل مش متفعل
      if (!data?.mobile_verified || data?.next_screen === "mobile_otp") {
        return children;
      }





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
