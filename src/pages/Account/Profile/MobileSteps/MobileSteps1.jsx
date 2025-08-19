import { useMutation } from "@tanstack/react-query";
import { changeMobileSendOTP } from "../../../../services/authService";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "../../../../components/form/PhoneInput";
import FormError from "../../../../components/form/FormError";
import FormBtn from "../../../../components/form/FormBtn";

const MobileSteps1 = ({ profile, setNewPhoneNumber, goNext, isEditing }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [showEditBtn, setShowEditBtn] = useState(false);

  const mutationOTP = useMutation({
    mutationFn: changeMobileSendOTP,
    onSuccess: (data) => {
      setNewPhoneNumber((prev) => ({
        ...prev,
        mobile: formik.values.mobile,
        country_code: formik.values.country_code,
      }));
      setErrorMsg("");
      console.log("OTP sent successfully", data);

      goNext();
    },
    onError: (error) => {
      setErrorMsg(error?.response?.data?.error_msg || "حدث خطأ أثناء الإرسال");
    },
  });

  const profileSchema = Yup.object({
    mobile: Yup.string()
      .min(9, "رقم الهاتف يجب أن يحتوي على 9 أرقام على الأقل")
      .required("رقم الهاتف مطلوب"),
    // email: Yup.string()
    //   .email("البريد الالكتروني غير صالح")
    //   .required("البريد الالكتروني مطلوب"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      mobile: profile?.mobile,
      country_code: profile?.country_code || "+962",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      // تحقق لو الرقم ما اتغيرش
      if (
        values.mobile === profile?.mobile &&
        values.country_code === profile?.country_code
      ) {
        setErrorMsg("رقم الهاتف لم يتغير");
        return; // وقف التنفيذ
      }

      // لو الرقم مختلف ابعت OTP
      mutationOTP.mutate({
        mobile: values.mobile,
        country_code: values.country_code,
      });
    },
  });

  useEffect(() => {
    if (!profile) return;

    const hasChanged =
      formik.values.mobile !== profile.mobile ||
      formik.values.country_code !== profile.country_code;

    setShowEditBtn(hasChanged);
  }, [formik.values, profile]);

  return (
    <div>
      <h3 className="text-lg lg:text-2xl font-bold text-primary mb-2">
        رقم الهاتف
      </h3>

      <form onSubmit={formik.handleSubmit} className="space-y-4 max-w-md">
        <PhoneInput formik={formik} disabled={!isEditing} />

        {/* <MainInput
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
          /> */}

        <FormError errorMsg={errorMsg} />
        {showEditBtn && isEditing && (
          <FormBtn title="ارسال كود التحقق" loading={mutationOTP.isPending} />
        )}
      </form>
    </div>
  );
};

export default MobileSteps1;
