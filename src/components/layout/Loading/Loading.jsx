const Loading = () => {
  return (
    <article className="h-screen flex items-center justify-center bg-bg-clr">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-22 h-22 border-8 border-light-red border-t-transparent rounded-full animate-spin"></div>
        <h2 className="text-xl font-semibold text-light-red">Loading...</h2>
      </div>
    </article>
  );
};

export default Loading;
