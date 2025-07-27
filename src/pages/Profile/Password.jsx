import { useFormik } from "formik";
import { CiBank } from "react-icons/ci";
import MainInput from "../../components/form/MainInput/MainInput";
import * as Yup from "yup";

const Password = () => {
  const addressSchema = Yup.object({
    oldPassword: Yup.string().required("كلمة المرور القديمة مطلوبة"),
    newPassword: Yup.string().required("كلمة المرور الجديدة مطلوبة"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: addressSchema,
    onSubmit: (values) => {
      console.log("Login data:", values);
    },
  });

  const getError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <div className="bg-white p-4 lg:p-8 rounded-lg shadow-md space-y-4">
      <h3 className="text-lg lg:text-2xl text-primary font-bold">
        تعديل كلمة المرور
      </h3>

      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <MainInput
          id="oldPassword"
          placeholder="كلمة المرور القديمة"
          label="كلمة المرور القديمة"
          icon={<CiBank />}
          type="password"
          error={getError("oldPassword")}
          onChange={formik.handleChange}
          value={formik.values.oldPassword}
          onBlur={formik.handleBlur}
        />
        <MainInput
          id="newPassword"
          placeholder="كلمه المرور الجديدة"
          label="كلمه المرور الجديدة"
          icon={<CiBank />}
          type="password"
          error={getError("newPassword")}
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          onBlur={formik.handleBlur}
        />

        <button className="mainBtn lg:col-span-2" type="submit">
          حفظ
        </button>
      </form>
    </div>
  );
};

export default Password;
