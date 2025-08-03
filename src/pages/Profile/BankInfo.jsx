import { useState } from "react";
import MainInput from "../../components/form/MainInput/MainInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaRegEdit } from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { completeRegister } from "../../services/authService";
import FormError from "../../components/form/FormError";
import FormBtn from "../../components/form/FormBtn";

const BankInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 🟢 جلب بيانات البروفايل من الـ Redux
  const { profile } = useSelector((state) => state.profile);
  const userBank = profile?.user_bank || {};

  // 🟢 Mutation للتعديل على البيانات البنكية
  const mutation = useMutation({
    mutationFn: completeRegister,
    onSuccess: () => {
      alert("تم تعديل البيانات البنكية بنجاح ✅");
      setIsEditing(false);
    },
    onError: (error) => {
      setErrorMsg(error?.response?.data?.error_msg || "حدث خطأ أثناء التعديل");
    },
  });

  // 🟢 الفاليديشن بعد التعديل
  const bankSchema = Yup.object({
    bank_name: Yup.string().required("اسم البنك مطلوب"),
    account_number: Yup.string()
      .matches(/^\d+$/, "رقم الحساب يجب أن يكون أرقام فقط")
      .required("رقم الحساب مطلوب"),
    branch: Yup.string().required("اسم الفرع مطلوب"),
    iban: Yup.string()
      .matches(/^[A-Z0-9]+$/, "رقم الايبان يجب أن يكون حروف وأرقام فقط")
      .required("رقم الايبان البنكي مطلوب"),
    swift_code: Yup.string().required("رمز سويفت مطلوب"),
    currency: Yup.string().required("العملة مطلوبة"),
    clik_name: Yup.string().required("اسم كليك مطلوب"),
  });

  // 🟢 Formik بنفس أسماء الـ API
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bank_name: userBank.bank_name || "",
      account_number: userBank.account_number || "",
      branch: userBank.branch || "",
      iban: userBank.iban || "",
      swift_code: userBank.swift_code || "",
      currency: userBank.currency || "",
      clik_name: userBank.clik_name || "",
    },
    validationSchema: bankSchema,
    onSubmit: (values) => {
      setErrorMsg("");
      mutation.mutate({
        form_type: "bank",
        bank: values, // بنفس الأسماء
      });
    },
  });

  const getError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg lg:text-2xl text-primary font-bold">
          البيانات البنكية
        </h3>

        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className={`border border-neutral-300 px-4 py-2 rounded-xl flex items-center gap-2 lg:text-lg cursor-pointer ${
            isEditing ? "bg-secondary/30 border-secondary/30" : ""
          }`}
        >
          <FaRegEdit />
          تعديل
        </button>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MainInput
            id="bank_name"
            placeholder="اسم البنك"
            label="اسم البنك"
            icon={<CiBank />}
            disabled={!isEditing}
            error={getError("bank_name")}
            onChange={formik.handleChange}
            value={formik.values.bank_name}
            onBlur={formik.handleBlur}
          />

          <MainInput
            id="account_number"
            type="number"
            placeholder="رقم الحساب"
            label="رقم الحساب"
            icon={<CiBank />}
            disabled={!isEditing}
            error={getError("account_number")}
            onChange={formik.handleChange}
            value={formik.values.account_number}
            onBlur={formik.handleBlur}
          />

          <MainInput
            id="branch"
            placeholder="الفرع"
            label="الفرع"
            icon={<CiBank />}
            disabled={!isEditing}
            error={getError("branch")}
            onChange={formik.handleChange}
            value={formik.values.branch}
            onBlur={formik.handleBlur}
          />

          <MainInput
            id="iban"
            placeholder="رقم الايبان البنكي"
            label="رقم الايبان البنكي"
            icon={<CiBank />}
            disabled={!isEditing}
            error={getError("iban")}
            onChange={formik.handleChange}
            value={formik.values.iban}
            onBlur={formik.handleBlur}
          />

          <MainInput
            id="swift_code"
            placeholder="رمز سويفت"
            label="رمز سويفت"
            icon={<CiBank />}
            disabled={!isEditing}
            error={getError("swift_code")}
            onChange={formik.handleChange}
            value={formik.values.swift_code}
            onBlur={formik.handleBlur}
          />

          <MainInput
            id="currency"
            placeholder="العملة"
            label="العملة"
            icon={<CiBank />}
            disabled={!isEditing}
            error={getError("currency")}
            onChange={formik.handleChange}
            value={formik.values.currency}
            onBlur={formik.handleBlur}
          />

          <MainInput
            id="clik_name"
            placeholder="اسم كليك"
            label="اسم كليك"
            icon={<CiBank />}
            disabled={!isEditing}
            error={getError("clik_name")}
            onChange={formik.handleChange}
            value={formik.values.clik_name}
            onBlur={formik.handleBlur}
          />
        </div>

        <FormError errorMsg={errorMsg} />

        {isEditing && (
          <FormBtn
            title="حفظ"
            loading={mutation.isPending}
            className="lg:col-span-2"
          />
        )}
      </form>
    </>
  );
};

export default BankInfo;
