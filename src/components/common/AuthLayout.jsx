import logoImg from "../../assets/images/logo.png";
import favLogo from "../../assets/images/fav-logo.png";
import bannerImg from "../../assets/images/banner-img.png";
import mainImg from "../../assets/images/main-img.png";

const AuthLayout = ({ children }) => {
  return (
    <section className="min-h-screen flex justify-between bg-base-white">
      <div className="flex-1 p-4 flex items-center justify-center relative xl:bg-none">
        {/* <img
          src={bannerImg}
          loading="lazy"
          alt="background"
          className="fixed inset-0 w-full h-full object-cover object-center xl:hidden"
        /> */}
        <div className="absolute inset-0 bg-primary/50 xl:bg-transparent" />
        <div className="w-full h-full max-w-2xl mx-auto p-6 bg-base-white rounded-2xl relative z-[1]">
          {/* <img
            src={favLogo}
            alt="logo"
            loading="lazy"
            className="mb-4 xl:mb-8 w-20 lg:w-32"
          /> */}
          {children}
        </div>
      </div>

      {/* <div className="hidden xl:block sticky top-0 w-1/2 h-screen overflow-hidden">
        <img
          src={mainImg}
          loading="lazy"
          alt="main background"
          className="absolute inset-0 w-full h-full object-cover object-right"
        />
        <img
          src={logoImg}
          alt="logo"
          loading="lazy"
          className="w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div> */}
    </section>
  );
};

export default AuthLayout;
