const Loader = () => {
  return (
    <div className="flex flex-col items-center">
      <img
        loading="lazy"
        src="/images/fav-logo.png"
        className="w-18 lg:w-26 animate-bounce"
        alt="Loading"
      />

      <h2 className="text-lg lg:text-2xl font-semibold text-light-red mt-2">
        جاري التحميل ...
      </h2>
    </div>
  );
};

export default Loader;
