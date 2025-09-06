import { useTranslation } from "react-i18next";

const Step5Company = ({ formik, getError }) => {
  const { t } = useTranslation();

  return (
    <div>
      <p className="my-4 font-bold">{t("pages.Step5Company.title")}</p>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="acknowledgement"
          name="acknowledgement"
          checked={formik.values.acknowledgement}
          onChange={(e) =>
            formik.setFieldValue("acknowledgement", e.target.checked)
          }
          className="h-10 w-10 border-gray-300 rounded focus:ring-primary-500 accent-primary"
        />
        <label htmlFor="acknowledgement" className="leading-6">
          {t("pages.Step5Company.acknowledgement.label")}
        </label>
      </div>

      {getError("acknowledgement") && (
        <p className="text-error-100 mt-2">{getError("acknowledgement")}</p>
      )}
    </div>
  );
};

export default Step5Company;
