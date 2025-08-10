import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import MainInput from "../../../../../../components/form/MainInput/MainInput";
import { RiBankLine } from "react-icons/ri";
import FormBtn from "../../../../../../components/form/FormBtn";
import {
  getBanks,
  sendAddressOrBankData,
} from "../../../../../../services/authService";
import FormError from "../../../../../../components/form/FormError";
import { useState } from "react";
import { CiBank } from "react-icons/ci";

export default function Step1({ formData, setFormData, setStep }) {
  const [errorMsg, setErrorMsg] = useState(null);

  // جلب البنوك
  const { data: banksData, isLoading: loadingBanks } = useQuery({
    queryKey: ["banks"],
    queryFn: getBanks,
  });
  const banks = banksData?.data || [];

  console.log("banks", banks);

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
      iban: formData.iban || "",
      currency: formData.currency || "",
      clik_name: formData.clik_name || "",
      bank_id: formData.bank_id || "",
    },
    validationSchema: Yup.object({
      iban: Yup.string().required("رقم الايبان مطلوب"),
      currency: Yup.string().required("رقم الحساب مطلوب"),
      clik_name: Yup.string().required("اسم البنك مطلوب"),
      bank_id: Yup.string().required("اسم الفرع مطلوب"),
    }),
    onSubmit: (values) => {
      mutation.mutate({
        form_type: "bank",
        bank: {
          iban: values.iban,
          currency: values.currency,
          clik_name: values.clik_name,
          bank_id: values.bank_id,
        },
      });
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          id="iban"
          label="رقم الايبان"
          name="iban"
          placeholder="SA1234567890123456"
          value={formik.values.iban}
          onChange={formik.handleChange}
          error={getError("iban")}
        />
        <MainInput
          id="currency"
          label="رقم الحساب"
          name="currency"
          placeholder="123456"
          value={formik.values.currency}
          onChange={formik.handleChange}
          error={getError("currency")}
        />
        <MainInput
          id="clik_name"
          label="اسم البنك"
          name="clik_name"
          placeholder="اسم البنك"
          value={formik.values.clik_name}
          onChange={formik.handleChange}
          error={getError("clik_name")}
          icon={<RiBankLine />}
        />
        <MainInput
          id="bank_id"
          type="select"
          placeholder="اسم الفرع"
          label="اسم الفرع"
          error={getError("bank_id")}
          value={formik.values.bank_id}
          onChange={formik.handleChange}
          disabled={loadingBanks}
          icon={<CiBank />}
          options={[
            { value: "", label: "اختر البنك" },
            ...banks.map((c) => ({ value: c.id, label: c.name })),
          ]}
        />
      </div>

      <FormError errorMsg={errorMsg} />

      <FormBtn title="التالي" loading={mutation.isPending} />
    </form>
  );
}
