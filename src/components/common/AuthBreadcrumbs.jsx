const AuthBreadcrumbs = ({ items = [], title }) => {
  return (
    <div className="mb-4 lg:mb-8">
      {title && (
        <h2 className="text-2xl lg:text-3xl font-bold mb-2 lg:mb-4">{title}</h2>
      )}

      <div className="text-neutral-500 flex items-center gap-2 text-sm lg:text-base">
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-2">
            {item.path ? <span>{item.label}</span> : <span>{item.label}</span>}
            {index < items.length - 1 && <span>{">"}</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AuthBreadcrumbs;
