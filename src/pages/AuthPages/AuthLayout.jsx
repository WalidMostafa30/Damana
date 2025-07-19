import { Outlet } from "react-router-dom";
import bannerImg from "../../assets/images/main-img.png";

const AuthLayout = () => {
  return (
    <section className="min-h-screen flex justify-between">
      <div className="w-full max-w-2xl mx-auto px-4 py-16 xl:ps-16 overflow-y-auto">
        <Outlet />
      </div>

      <div className="hidden xl:block max-w-1/2 h-screen">
        <img
          src={bannerImg}
          alt="banner"
          loading="lazy"
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default AuthLayout;
