const FormBtn = ({
  title,
  disabled,
  loading,
  onClick = () => {},
  type = "submit",
  variant = "primary",
}) => {
  const isDisabled = disabled || loading;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`mainBtn ${variant === "light" ? "light" : ""} ${
        loading ? "!cursor-wait contrast-50" : ""
      }`}
    >
      {loading ? (
        <>
          جاري التحميل...
          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ms-2"></span>
        </>
      ) : (
        title
      )}
    </button>
  );
};

export default FormBtn;
