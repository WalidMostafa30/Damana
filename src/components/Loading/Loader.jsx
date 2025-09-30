import favLogo from "../../assets/images/logo9658logo9658.png";

const Loader = () => {
  return (
    <div className="flex flex-col items-center">
      <img
        loading="lazy"
        src={favLogo}
        className="w-26 lg:w-36 animate-bounce"
        alt="Loading"
      />

      <h2 className="text-lg lg:text-2xl font-semibold text-light-red mt-2">
        جاري التحميل ...
      </h2>
    </div>
  );
};

export default Loader;
