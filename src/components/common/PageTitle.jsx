const PageTitle = ({ title, subtitle }) => {
  return (
    <div className="space-y-2 lg:space-y-4">
      <h2 className="text-xl lg:text-3xl font-bold">{title}</h2>
      <p className="lg:text-lg text-neutral-500">{subtitle}</p>
    </div>
  );
};

export default PageTitle;
