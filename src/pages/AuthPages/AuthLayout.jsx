import { Outlet } from "react-router-dom";
import bannerImg from "../../assets/images/main-img.png";
import logoImg from "../../assets/images/logo.png";
import favLogo from "../../assets/images/fav-logo.png";

const AuthLayout = () => {
  return (
    <section className="min-h-screen flex justify-between">
      <div className="flex-1">
        <img src={favLogo} alt="logo" loading="lazy" className="mb-8" />

        <div className="w-full max-w-2xl mx-auto px-4">
          <Outlet />
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url(${bannerImg})`,
          backgroundSize: "cover",
          backgroundPosition: "right",
        }}
        className="hidden xl:block sticky top-0 w-1/2 h-screen overflow-hidden"
      >
        <img
          src={logoImg}
          alt="logo"
          loading="lazy"
          className="w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </section>
  );
};

export default AuthLayout;
