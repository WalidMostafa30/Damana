import { Link } from "react-router-dom";

const Breadcrumbs = ({ items = [] }) => {
  return (
    <div className="text-neutral-500 flex items-center gap-2">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {item.path ? (
            <Link to={item.path}>{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && <span>{">"}</span>}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
