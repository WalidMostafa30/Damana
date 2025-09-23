import blurImg from "../../assets/images/blur-img.png";

const DetailsCard = ({ data = [], blur = false, col = 1 }) => {
  if (blur)
    return <img src={blurImg} loading="lazy" alt="blur" className="w-full" />;

  return (
    <div
      className={`whiteContainer text-primary text-sm lg:text-base font-medium ${
        col === 2 && "grid grid-cols-1 lg:grid-cols-2"
      }`}
    >
      {data.map(
        (item, index) =>
          item.value && (
            <div
              key={index}
              className={`flex justify-between items-center py-2 ${
                col === 2 &&
                "lg:not-even:border-e lg:not-even:pe-4 lg:even:ps-4 border-gray-200"
              }`}
            >
              <p>{item.label}</p>
              <p>{item.value}</p>
            </div>
          )
      )}
    </div>
  );
};

export default DetailsCard;
