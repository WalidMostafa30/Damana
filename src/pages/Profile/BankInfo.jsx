import { useState } from "react";
import MainInput from "../../components/form/MainInput/MainInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaRegEdit } from "react-icons/fa";
import { CiBank } from "react-icons/ci";

const BankInfo = () => {
  const [isEditing, setIsEditing] = useState(false);

  const bankSchema = Yup.object({
    bankName: Yup.string().required("اسم البنك مطلوب"),
    accountNumber: Yup.string()
      .matches(/^\d+$/, "رقم الحساب يجب أن يكون أرقام فقط")
      .required("رقم الحساب مطلوب"),
    branchName: Yup.string().required("اسم الفرع مطلوب"),
    iban: Yup.string()
      .matches(/^[A-Z0-9]+$/, "رقم الايبان يجب أن يكون حروف وأرقام فقط")
      .required("رقم الايبان البنكي مطلوب"),
    swiftCode: Yup.string().required("رمز سويفت مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      bankName: "",
      accountNumber: "",
      branchName: "",
      iban: "",
      swiftCode: "",
    },
    validationSchema: bankSchema,
    onSubmit: (values) => {
      console.log("Login data:", values);
      setIsEditing(false);
    },
  });

  const getError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <div className="bg-white p-4 lg:p-8 rounded-lg shadow-md space-y-4">
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

      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <MainInput
          id="bankName"
          placeholder="اسم البنك"
          label="اسم البنك"
          icon={<CiBank />}
          disabled={!isEditing}
          error={getError("bankName")}
          onChange={formik.handleChange}
          value={formik.values.bankName}
          onBlur={formik.handleBlur}
        />
        <MainInput
          id="accountNumber"
          type="number"
          placeholder="رقم الحساب"
          label="رقم الحساب"
          icon={<CiBank />}
          disabled={!isEditing}
          error={getError("accountNumber")}
          onChange={formik.handleChange}
          value={formik.values.accountNumber}
          onBlur={formik.handleBlur}
        />
        <MainInput
          id="branchName"
          placeholder="الفرع"
          label="الفرع"
          icon={<CiBank />}
          disabled={!isEditing}
          error={getError("branchName")}
          onChange={formik.handleChange}
          value={formik.values.branchName}
          onBlur={formik.handleBlur}
        />
        <MainInput
          id="iban"
          type="number"
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
          id="swiftCode"
          placeholder="رمز سويفت"
          label="رمز سويفت"
          icon={<CiBank />}
          disabled={!isEditing}
          error={getError("swiftCode")}
          onChange={formik.handleChange}
          value={formik.values.swiftCode}
          onBlur={formik.handleBlur}
        />

        {isEditing && (
          <button className="mainBtn lg:col-span-2" type="submit">
            حفظ
          </button>
        )}
      </form>
    </div>
  );
};

export default BankInfo;
