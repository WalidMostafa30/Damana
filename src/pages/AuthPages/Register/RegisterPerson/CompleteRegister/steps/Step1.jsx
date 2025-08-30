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

export default function Step1({ formData, setFormData, setStep }) {
  const [errorMsg, setErrorMsg] = useState(null);

  const mutation = useMutation({
    mutationFn: sendAddressOrBankData,
    onSuccess: (data, values) => {
      setFormData((prev) => ({ ...prev, ...values }));
      setStep((prev) => prev + 1);
    },
    onError: (err) => {
      setErrorMsg(err?.response?.data?.error_msg || "حدث خطأ ما");
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
      bank_id: Yup.string().required("اسم البنك مطلوب"),
      iban: Yup.string()
        .test("iban-check", "رقم الايبان غير صالح", (value) =>
          isValid(value || "")
        )
        .required("رقم الايبان مطلوب"),
      swift_code: Yup.string().required("رقم السويفت مطلوب"),
      currency: Yup.string().required("العملة مطلوبة"),
      clik_name: Yup.string(), // هنا اختياري زي Step3Company
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
          label="رقم الحساب الدولي (IBAN)"
          id="iban"
          name="iban"
          placeholder="مثال: SA4420000001234567891234"
          value={formik.values.iban}
          onChange={formik.handleChange}
          error={getError("iban")}
          icon={<GoFileBinary />}
        />

        <MainInput
          label="رقم السويفت (SWIFT Code)"
          id="swift_code"
          name="swift_code"
          placeholder="مثال: NBEGEGCXXXX"
          value={formik.values.swift_code}
          onChange={formik.handleChange}
          error={getError("swift_code")}
          icon={<IoMdCode />}
        />

        <MainInput
          type="select"
          label="العملة"
          id="currency"
          name="currency"
          value={formik.values.currency}
          onChange={formik.handleChange}
          error={getError("currency")}
          icon={<SiBitcoin />}
          options={[
            { value: "", label: "اختر العمله" },
            ...["JOD", "SAR", "USD", "EUR"].map((c) => ({
              value: c,
              label: c,
            })),
          ]}
        />

        <MainInput
          label="اسم المستخدم (CLIQ) (اختياري)"
          id="clik_name"
          name="clik_name"
          placeholder="مثال: user@bank.com"
          value={formik.values.clik_name}
          onChange={formik.handleChange}
          error={getError("clik_name")}
          icon={<IoIdCardSharp />}
        />
      </div>

      <FormError errorMsg={errorMsg} />

      <FormBtn title="التالي" loading={mutation.isPending} />
    </form>
  );
}
