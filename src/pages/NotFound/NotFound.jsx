import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <article className="pageContainer flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <FaExclamationTriangle className="text-warning-200 text-7xl lg:text-9xl" />
        <h1 className="text-4xl lg:text-6xl">404</h1>
        <h3 className="text-xl lg:text-2xl">عذرًا، الصفحة غير موجودة!</h3>
        <p className="lg:text-lg">الصفحة التي تبحث عنها قد تم نقلها أو لا توجد.</p>
        <button
          onClick={() => navigate("/", { replace: true })}
          className="mainBtn"
        >
          الصفحة الرئيسية
        </button>
      </div>
    </article>
  );
};

export default NotFound;
