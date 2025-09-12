import { useFormik } from "formik";
import * as Yup from "yup";
import MainInput from "../../components/form/MainInput/MainInput";
// لو عندك مكتبة i18n زي react-i18next
import { useTranslation } from "react-i18next";

const Support = () => {
  const { t } = useTranslation();

  const addressSchema = Yup.object({
    message: Yup.string().required(t("pages.account.support.messageRequired")),
  });

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: addressSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const getError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <>
      <h3 className="text-lg lg:text-2xl text-primary font-bold">
        {t("pages.account.support.title")}
      </h3>

      <p className="text-neutral-500 lg:text-lg">
        {t("pages.account.support.description")}
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <MainInput
          label={t("pages.account.support.messageLabel")}
          type="textarea"
          name="message"
          value={formik.values.message}
          error={getError("message")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <button className="mainBtn" type="submit">
          {t("pages.account.support.submit")}
        </button>
      </form>
    </>
  );
};

export default Support;
