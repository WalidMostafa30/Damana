import logoImg from "../../assets/images/logo.png";
import favLogo from "../../assets/images/fav-logo.png";

const AuthLayout = ({ children }) => {
  return (
    <section className="min-h-screen flex justify-between bg-base-white">
      <div
        className="flex-1 p-4 flex items-center justify-center
        bg-cover bg-no-repeat bg-center bg-[url(images/banner-img.png)] xl:bg-none"
      >
        <div className="w-full h-full max-w-2xl mx-auto p-6 bg-base-white rounded-2xl">
          <img
            src={favLogo}
            alt="logo"
            loading="lazy"
            className="mb-4 xl:mb-8"
          />
          {children}
        </div>
      </div>

      <div
        className={`hidden xl:block sticky top-0 w-1/2 h-screen overflow-hidden bg-[url(images/main-img.png)] bg-cover bg-right`}
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
