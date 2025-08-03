const Avatar = ({ name, image, size = "lg" }) => {
  const getInitials = (fullName) => {
    if (!fullName) return "";
    const parts = fullName.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const second = parts[1]?.[0] || "";
    return `${first}${second}`.toUpperCase();
  };

  const initials = getInitials(name);

  const sizeClasses = {
    sm: "w-10 h-10 lg:w-10 lg:h-10 lg:text-lg",
    md: "w-10 h-10 lg:w-12 lg:h-12 lg:text-xl",
    lg: "w-12 h-12 text-lg lg:w-16 lg:h-16 lg:text-2xl",
  };

  return (
    <div
      dir="ltr"
      className={`${
        sizeClasses[size] || sizeClasses.lg
      } font-bold rounded-full flex items-center justify-center border border-neutral-300 overflow-hidden bg-white`}
    >
      {image ? (
        <img
          src={image}
          alt={name || "Avatar"}
          className="w-full h-full object-cover"
        />
      ) : (
        <>
          <span className="text-primary">{initials[0] || ""}</span>
          <span className="text-secondary">{initials[1] || ""}</span>
        </>
      )}
    </div>
  );
};

export default Avatar;
