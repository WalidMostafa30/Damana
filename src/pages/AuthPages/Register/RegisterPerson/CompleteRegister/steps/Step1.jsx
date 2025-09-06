import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import MainInput from "../../../../../../components/form/MainInput/MainInput";
import FormBtn from "../../../../../../components/form/FormBtn";
import { sendAddressOrBankData } from "../../../../../../services/authService";
import FormError from "../../../../../../components/form/FormError";
import { useState } from "react";
import BankSelect from "../../../../../../components/form/BankSelect";
import { GoFileBinary } from "react-icons/go";
import { SiBitcoin } from "react-icons/si";
import { IoIdCardSharp } from "react-icons/io5";
import { IoMdCode } from "react-icons/io";
import { isValid } from "iban";
import { useTranslation } from "react-i18next";

export default function Step1({ formData, setFormData, setStep }) {
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState(null);

  const mutation = useMutation({
    mutationFn: sendAddressOrBankData,
    onSuccess: (data, values) => {
      setFormData((prev) => ({ ...prev, ...values }));
      setStep((prev) => prev + 1);
    },
    onError: (err) => {
      setErrorMsg(
        err?.response?.data?.error_msg || t("pages.Step1.errors.general")
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      bank_id: formData.bank_id || "",
      iban: formData.iban || "",
      swift_code: formData.swift_code || "",
      currency: formData.currency || "",
      clik_name: formData.clik_name || "",
    },
    validationSchema: Yup.object({
      bank_id: Yup.string().required(t("pages.Step1.validation.bank_required")),
      iban: Yup.string()
        .test("iban-check", t("pages.Step1.validation.iban_invalid"), (value) =>
          isValid(value || "")
        )
        .required(t("pages.Step1.validation.iban_required")),
      swift_code: Yup.string().required(
        t("pages.Step1.validation.swift_code_required")
      ),
      currency: Yup.string().required(
        t("pages.Step1.validation.currency_required")
      ),
      clik_name: Yup.string(),
    }),
    onSubmit: (values) => {
      mutation.mutate({
        form_type: "bank",
        bank: {
          bank_id: values.bank_id,
          iban: values.iban,
          swift_code: values.swift_code,
          currency: values.currency,
          clik_name: values.clik_name,
        },
      });
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BankSelect formik={formik} />

        <MainInput
          label={t("pages.Step1.form.iban")}
          id="iban"
          name="iban"
          placeholder={t("pages.Step1.form.iban_placeholder")}
          value={formik.values.iban}
          onChange={formik.handleChange}
          error={getError("iban")}
          icon={<GoFileBinary />}
        />

        <MainInput
          label={t("pages.Step1.form.swift_code")}
          id="swift_code"
          name="swift_code"
          placeholder={t("pages.Step1.form.swift_code_placeholder")}
          value={formik.values.swift_code}
          onChange={formik.handleChange}
          error={getError("swift_code")}
          icon={<IoMdCode />}
        />

        <MainInput
          type="select"
          label={t("pages.Step1.form.currency")}
          id="currency"
          name="currency"
          value={formik.values.currency}
          onChange={formik.handleChange}
          error={getError("currency")}
          icon={<SiBitcoin />}
          options={[
            { value: "", label: t("pages.Step1.form.currency_placeholder") },
            ...["JOD", "SAR", "USD", "EUR"].map((c) => ({
              value: c,
              label: c,
            })),
          ]}
        />

        <MainInput
          label={t("pages.Step1.form.clik_name")}
          id="clik_name"
          name="clik_name"
          placeholder={t("pages.Step1.form.clik_name_placeholder")}
          value={formik.values.clik_name}
          onChange={formik.handleChange}
          error={getError("clik_name")}
          icon={<IoIdCardSharp />}
        />
      </div>

      <FormError errorMsg={errorMsg} />

      <FormBtn
        title={t("pages.Step1.form.next_button")}
        loading={mutation.isPending}
      />
    </form>
  );
}
