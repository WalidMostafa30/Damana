import Loader from "./Loader";

const LoadingPage = () => {
  return (
    <article className="h-screen flex items-center justify-center w-screen fixed inset-0 z-50 bg-white">
      <Loader />
    </article>
  );
};

export default LoadingPage;
