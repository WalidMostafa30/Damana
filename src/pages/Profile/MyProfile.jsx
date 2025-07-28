import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import MainInput from "../../components/form/MainInput/MainInput";
import { GoMail } from "react-icons/go";
import { useFormik } from "formik";
import * as Yup from "yup";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const profileSchema = Yup.object({
    phoneNumber: Yup.string()
      .min(9, "رقم الهاتف يجب أن يحتوي على 9 أرقام على الأقل")
      .required("رقم الهاتف مطلوب"),
    email: Yup.string()
      .email("البريد الالكتروني غير صالح")
      .required("البريد الالكتروني مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      email: "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      console.log("Login data:", values);
      setIsEditing(false); 
    },
  });

  const getError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <div className="space-y-4 lg:space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 lg:p-8 rounded-lg shadow-md">
        <div className="flex gap-2">
          <div
            dir="ltr"
            className="w-12 h-12 lg:w-16 lg:h-16 text-2xl lg:text-3xl font-bold bg-white rounded-full flex items-center justify-center border border-neutral-300"
          >
            <span className="text-primary">Y</span>
            <span className="text-secondary">M</span>
          </div>
          <div>
            <h3 className="text-lg lg:text-2xl font-medium text-primary mb-2">
              ياسمين حسن احمد المقداد
            </h3>
            <p>+765656756856</p>
          </div>
        </div>

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

      <div className="bg-white p-4 lg:p-8 rounded-lg shadow-md">
        <h3 className="text-lg lg:text-2xl text-primary mb-2">
          البريد الالكتروني ورقم الهاتف
        </h3>

        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          <MainInput
            type="tel"
            id="phone"
            placeholder="96269077885+"
            label="رقم الهاتف"
            value={formik.values.phoneNumber}
            onChange={(phone) => formik.setFieldValue("phoneNumber", phone)}
            onBlur={formik.handleBlur}
            error={getError("phoneNumber")}
            disabled={!isEditing}
          />

          <MainInput
            type="email"
            id="email"
            placeholder="yasmin@example.com"
            label="البريد الالكتروني"
            icon={<GoMail />}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={getError("email")}
            disabled={!isEditing}
          />

          {isEditing && (
            <button className="mainBtn lg:col-span-2" type="submit">
              حفظ
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
