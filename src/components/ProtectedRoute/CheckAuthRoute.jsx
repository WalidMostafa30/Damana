import { Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../../services/authService";
import LoadingPage from "../Loading/LoadingPage";
import DisActivePage from "../../pages/NotFound/DisActivePage";
import { useDispatch } from "react-redux";
import { closeLogoutModal } from "../../store/modalsSlice/logoutModalSlice";
import ActionModal from "../modals/ActionModal";

export default function CheckAuthRoute({ children }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkAuth,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isLoading) return <LoadingPage />;

  if (error?.response?.data?.error_code === 401) {
    return (
      <ActionModal
        openModal={true}
        msg={
          <>
            <h2 className="text-xl font-bold">انتهت الجلسة</h2>
            <p>انتهت صلاحية تسجيل الدخول، يرجى تسجيل الدخول مرة أخرى.</p>
          </>
        }
        icon="warning"
        primaryBtn={{
          text: "الذهاب الى صفحه تسجيل الدخول",
          action: () => {
            dispatch(closeLogoutModal());
            navigate("/login");
          },
        }}
      />
    );
  }

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
