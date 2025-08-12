import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import TopHeader from "./components/layout/Header/TopHeader";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main>
      {/* <TopHeader /> */}
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </main>
  );
}

export default App;
