const FormBtn = ({ title, disabled, loading, onClick = () => {} }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`mainBtn ${loading ? "!cursor-wait contrast-50" : ""}`}
    >
      {loading ? (
        <>
          جاري التحميل...
          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        </>
      ) : (
        title
      )}
    </button>
  );
};

export default FormBtn;
