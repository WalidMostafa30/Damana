import { useFormik } from "formik";
import * as Yup from "yup";
import MainInput from "../../components/form/MainInput/MainInput";

const Support = () => {
  const addressSchema = Yup.object({
    message: Yup.string().required("الرسالة مطلوبة"),
  });

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: addressSchema,
    onSubmit: (values) => {
      console.log("Login data:", values);
    },
  });

  const getError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <div className="bg-white p-4 lg:p-8 rounded-lg shadow-md space-y-4">
      <h3 className="text-lg lg:text-2xl text-primary font-bold">الدعم</h3>

      <p className="text-neutral-500 text-lg">
        يمكنك محادثة الدعم واخبارهم باي مشكلة تواجهك من خلال شرحها في الصندوق
        وارسالها وسيتم الرد عليك باقرب وقت
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <MainInput
          type="textarea"
          value={formik.values.message}
          error={getError("message")}
          onChange={formik.handleChange}
        />

        <button className="mainBtn" type="submit">
          ارسال
        </button>
      </form>
    </div>
  );
};

export default Support;
