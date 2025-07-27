const PageTitle = ({ title, subtitle }) => {
  return (
    <div>
      <h2 className="text-xl lg:text-3xl font-bold">{title}</h2>
      <p className="lg:text-lg text-neutral-500">{subtitle}</p>
    </div>
  );
};

export default PageTitle;
