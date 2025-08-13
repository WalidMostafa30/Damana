import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import TopHeader from "./components/layout/Header/TopHeader";
import { useDispatch, useSelector } from "react-redux";
import { closeLogoutModal } from "./store/modalsSlice/logoutModalSlice";
import ActionModal from "./components/modals/ActionModal";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { isOpen } = useSelector((state) => state.logoutModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <main>
      {/* <TopHeader /> */}
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}

      {/* logout modal */}
      <ActionModal
        openModal={isOpen}
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
    </main>
  );
}

export default App;
