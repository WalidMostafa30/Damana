import { useFormik } from "formik";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import MainInput from "../../components/form/MainInput/MainInput";
import * as Yup from "yup";

const Address = () => {
  const [isEditing, setIsEditing] = useState(false);

  const addressSchema = Yup.object({
    buildingNumber: Yup.number()
      .required("رقم البناية مطلوب")
      .positive("رقم البناية يجب أن يكون موجبًا")
      .integer("رقم البناية يجب أن يكون عددًا صحيحًا"),
    streetName: Yup.string().required("اسم الشارع مطلوب"),
    country: Yup.string().required("البلد مطلوب"),
    city: Yup.string().required("المدينة مطلوبة"),
  });

  const formik = useFormik({
    initialValues: {
      buildingNumber: "",
      streetName: "",
      country: "",
      city: "",
    },
    validationSchema: addressSchema,
    onSubmit: (values) => {
      console.log("Login data:", values);
      setIsEditing(false);
    },
  });

  const getError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <div className="bg-white p-4 lg:p-8 rounded-lg shadow-md space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg lg:text-2xl text-primary font-bold">العنوان</h3>

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
          id="buildingNumber"
          type="number"
          placeholder="رقم البناية"
          label="رقم البناية"
          icon={<CiBank />}
          disabled={!isEditing}
          error={getError("buildingNumber")}
          onChange={formik.handleChange}
          value={formik.values.buildingNumber}
          onBlur={formik.handleBlur}
        />
        <MainInput
          id="streetName"
          placeholder="اسم الشارع"
          label="اسم الشارع"
          icon={<CiBank />}
          disabled={!isEditing}
          error={getError("streetName")}
          onChange={formik.handleChange}
          value={formik.values.streetName}
          onBlur={formik.handleBlur}
        />
        <MainInput
          id="country"
          placeholder="البلد"
          label="البلد"
          icon={<CiBank />}
          disabled={!isEditing}
          error={getError("country")}
          onChange={formik.handleChange}
          value={formik.values.country}
          onBlur={formik.handleBlur}
        />
        <MainInput
          id="city"
          placeholder="المدينة"
          label="المدينة"
          icon={<CiBank />}
          disabled={!isEditing}
          error={getError("city")}
          onChange={formik.handleChange}
          value={formik.values.city}
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

export default Address;
