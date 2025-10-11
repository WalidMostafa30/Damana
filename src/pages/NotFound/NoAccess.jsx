import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NoAccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="max-w-md bg-white rounded-2xl shadow-lg p-8 border">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          {t("noAccess.title", "🚫 لا تملك صلاحية الوصول")}
        </h1>
        <p className="text-gray-600 mb-6">
          {t(
            "noAccess.message",
            "يبدو أنك لا تملك الصلاحية المناسبة لعرض هذه الصفحة."
          )}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/80 transition"
        >
          {t("noAccess.back", "العودة")}
        </button>
      </div>
    </section>
  );
};

export default NoAccess;
