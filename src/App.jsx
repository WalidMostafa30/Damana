import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import TopHeader from "./components/layout/Header/TopHeader";
import { useDispatch } from "react-redux";
import { getProfileAct } from "./store/profile/profileAction";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAct());
  }, [dispatch]);

  return (
    <main>
      <TopHeader />
      <Header />
      <div className="min-h-[calc(100dvh-156px)] lg:min-h-[calc(100vh-228px)]">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default App;
