import blurImg from "../../assets/images/blur-img.png";

const DetailsCard = ({ data = [], blur = false, col = 1 }) => {
  if (blur)
    return <img src={blurImg} loading="lazy" alt="blur" className="w-full" />;

  return (
    <div className="whiteContainer">
      <div
        className={`text-primary text-sm lg:text-base font-medium py-2 ${
          col === 2 && "grid grid-cols-1 lg:grid-cols-2"
        }`}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center px-4 py-2 ${
              col === 2 && "lg:not-even:border-e border-gray-200"
            }`}
          >
            <p>{item.label}</p>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsCard;
