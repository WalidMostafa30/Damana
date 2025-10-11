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
import { useTranslation } from "react-i18next";
import ActionModal from "../../../../../../components/modals/ActionModal";

export default function Step1({ formData, setFormData, setStep }) {
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState(null);
  const [openIbanWarning, setOpenIbanWarning] = useState(false); // 🟡 مودال التحذير للـ IBAN

  // ✅ تنظيف الـ IBAN من المسافات وتحويله كابيتال
  const cleanIban = (value) =>
    value ? value.replace(/\s+/g, "").toUpperCase() : "";

  // 🟢 Mutation
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

  // ✅ نفس تحقق الـ IBAN الموجود في BankInfo
  const bankSchema = Yup.object({
    bank_id: Yup.string().required(t("pages.Step1.validation.bank_required")),
    iban: Yup.string()
      .transform((value) => cleanIban(value))
      .matches(/^[A-Z0-9]+$/, t("pages.Step1.validation.iban_invalid")) // أحرف وأرقام فقط
      .min(30, t("pages.Step1.validation.iban_invalid"))
      .max(30, t("pages.Step1.validation.iban_invalid"))
      .required(t("pages.Step1.validation.iban_required")),
    swift_code: Yup.string().required(
      t("pages.Step1.validation.swift_code_required")
    ),
    currency: Yup.string().required(
      t("pages.Step1.validation.currency_required")
    ),
    clik_name: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      bank_id: formData.bank_id || "",
      iban: formData.iban || "",
      swift_code: formData.swift_code || "",
      currency: formData.currency || "",
      clik_name: formData.clik_name || "",
    },
    validationSchema: bankSchema,
    onSubmit: (values) => {
      mutation.mutate({
        form_type: "bank",
        bank: {
          bank_id: values.bank_id,
          iban: cleanIban(values.iban),
          swift_code: values.swift_code,
          currency: values.currency,
          clik_name: values.clik_name,
        },
      });
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  // 🟢 عند الخروج من حقل الـ IBAN نتحقق من الطول ونفتح المودال التحذيري
  const handleIbanBlur = (e) => {
    formik.handleBlur(e);
    const value = cleanIban(formik.values.iban);
    if (value.length === 30) {
      setOpenIbanWarning(true);
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BankSelect formik={formik} />

          {/* 🟢 IBAN */}
          <MainInput
            label={t("pages.Step1.form.iban")}
            id="iban"
            name="iban"
            placeholder={t("pages.Step1.form.iban_placeholder")}
            value={formik.values.iban}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/\s+/g, "").toUpperCase();
              formik.setFieldValue("iban", cleaned);
            }}
            onBlur={handleIbanBlur} // 🟢 إضافة الحدث هنا
            error={getError("iban")}
            icon={<GoFileBinary />}
          />

          {/* 🟢 SWIFT Code */}
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

          {/* 🟢 العملة */}
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

          {/* 🟢 CLIQ */}
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

      {/* 🟡 مودال تحذير IBAN */}
      <ActionModal
        openModal={openIbanWarning}
        msg={t("iban_warning")}
        icon="warning"
        primaryBtn={{
          text: "حسنًا",
          action: () => setOpenIbanWarning(false),
        }}
      />
    </>
  );
}
