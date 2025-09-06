import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import MainInput from "../../../../../../components/form/MainInput/MainInput";
import { CiBank, CiCalendar } from "react-icons/ci";
import { MdOutlinePublic } from "react-icons/md";
import { sendPersonalData } from "../../../../../../services/authService";
import FormBtn from "../../../../../../components/form/FormBtn";
import { useState } from "react";
import FormError from "../../../../../../components/form/FormError";
import CountrySelect from "../../../../../../components/form/CountrySelect";
import { useTranslation } from "react-i18next";

export default function Step0({ formData, setFormData, setStep }) {
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState(null);

  const mutation = useMutation({
    mutationFn: sendPersonalData,
    onSuccess: (data, values) => {
      setFormData((prev) => ({ ...prev, ...values }));
      setStep((prev) => prev + 1);
    },
    onError: (err) => {
      setErrorMsg(
        err?.response?.data?.error_msg || t("pages.Step0.errors.general")
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      dob: formData.dob || "",
      national_number: formData.national_number || "",
      nationality_type: formData.nationality_type || "",
      country_id: formData.country_id || "",
      document_id: formData.document_id || "",
    },
    validationSchema: Yup.object({
      dob: Yup.string().required(t("pages.Step0.validation.dob_required")),
      national_number: Yup.string().required(
        t("pages.Step0.validation.national_number_required")
      ),
      nationality_type: Yup.string().required(
        t("pages.Step0.validation.nationality_type_required")
      ),
      country_id: Yup.string().when("nationality_type", {
        is: (val) => val === "non",
        then: (schema) =>
          schema.required(t("pages.Step0.validation.country_required")),
        otherwise: (schema) => schema.notRequired(),
      }),
      document_id: Yup.string().when("nationality_type", {
        is: (val) => val === "jordanian" || val === "sons",
        then: (schema) =>
          schema.required(t("pages.Step0.validation.document_id_required")),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    onSubmit: (values) => {
      const payload = {
        ...values,
        country_id:
          values.nationality_type === "jordanian" ||
          values.nationality_type === "sons"
            ? 1
            : values.country_id,
      };
      mutation.mutate(payload);
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          id="dob"
          label={t("pages.Step0.form.dob")}
          name="dob"
          type="date"
          value={formik.values.dob}
          onChange={formik.handleChange}
          error={getError("dob")}
          icon={<CiCalendar />}
        />

        <MainInput
          id="nationality_type"
          type="select"
          label={t("pages.Step0.form.nationality_type")}
          name="nationality_type"
          value={formik.values.nationality_type}
          onChange={formik.handleChange}
          error={getError("nationality_type")}
          icon={<MdOutlinePublic />}
          options={[
            {
              value: "",
              label: t("pages.Step0.form.nationality_type_placeholder"),
            },
            {
              value: "jordanian",
              label: t("pages.Step0.form.nationality_options.jordanian"),
            },
            {
              value: "sons",
              label: t("pages.Step0.form.nationality_options.sons"),
            },
            {
              value: "non",
              label: t("pages.Step0.form.nationality_options.non"),
            },
          ]}
        />

        <MainInput
          id="national_number"
          label={t("pages.Step0.form.national_number")}
          name="national_number"
          placeholder={t("pages.Step0.form.national_number_placeholder")}
          value={formik.values.national_number}
          onChange={formik.handleChange}
          error={getError("national_number")}
        />

        {formik.values.nationality_type === "non" && (
          <CountrySelect formik={formik} name="country_id" />
        )}

        {(formik.values.nationality_type === "jordanian" ||
          formik.values.nationality_type === "sons") && (
          <MainInput
            id="document_id"
            label={t("pages.Step0.form.document_id")}
            name="document_id"
            placeholder={t("pages.Step0.form.document_id_placeholder")}
            value={formik.values.document_id}
            onChange={formik.handleChange}
            error={getError("document_id")}
          />
        )}
      </div>

      <FormError errorMsg={errorMsg} />

      <FormBtn
        title={t("pages.Step0.form.next_button")}
        loading={mutation.isPending}
      />
    </form>
  );
}
