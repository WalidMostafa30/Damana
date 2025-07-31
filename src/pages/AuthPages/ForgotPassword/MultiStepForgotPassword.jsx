import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import MainInput from "../../../components/form/MainInput/MainInput";
import AuthBreadcrumbs from "../../../components/common/AuthBreadcrumbs";
import AuthLayout from "../../../components/layout/AuthLayout";
import FormError from "../../../components/form/FormError";
import FormBtn from "../../../components/form/FormBtn";
import { CiMail } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import { FaRegStickyNote } from "react-icons/fa";

const MultiStepForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("phone");
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef([]);
  const correctCode = "00000";

  // OTP timer effect
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [step, timer]);

  // Formik
  const formik = useFormik({
    initialValues: {
      mobile: "",
      email: "",
      new_password: "",
    },
    validationSchema: getValidationSchema(step, method),
    onSubmit: (values) => {
      if (step === 1) {
        // تحقق من صحة الإدخال
        formik.validateForm().then((errors) => {
          if (Object.keys(errors).length === 0) setStep(2);
        });
      }
      if (step === 2) {
        const fullCode = otp.join("");
        if (fullCode.length < 5) {
          alert("من فضلك أدخل جميع الأرقام الخمسة");
          return;
        }
        if (fullCode !== correctCode) {
          alert("رمز التحقق غير صحيح");
          return;
        }
        setStep(3);
      }
      if (step === 3) {
        console.log("🎉 بيانات كاملة:", values);
        alert("تم تغيير كلمة المرور بنجاح ✅");
      }
    },
  });

  // Password strength
  const passwordStrength = calculatePasswordStrength(
    formik.values.new_password
  );

  // Handle OTP
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 4) inputsRef.current[index + 1]?.focus();
  };

  // UI render for steps
  const renderStep = () => {
    if (step === 1) {
      return (
        <>
          {method === "phone" ? (
            <MainInput
              type="tel"
              id="mobile"
              name="mobile"
              placeholder="96269077885+"
              label="رقم الهاتف"
              value={formik.values.mobile}
              onChange={(phone) => formik.setFieldValue("mobile", phone)}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && formik.errors.mobile}
            />
          ) : (
            <MainInput
              id="email"
              name="email"
              type="text"
              placeholder="أدخل بريدك الإلكتروني"
              icon={<CiMail />}
              label="البريد الإلكتروني"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
            />
          )}

          <button
            type="button"
            onClick={() => setMethod(method === "phone" ? "email" : "phone")}
            className="mainBtn light mt-4"
          >
            {method === "phone"
              ? "استخدام البريد الإلكتروني؟"
              : "استخدام رقم الهاتف؟"}
          </button>
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          <div className="flex gap-4 mb-4">
            {otp.map((val, idx) => (
              <input
                key={idx}
                ref={(el) => (inputsRef.current[idx] = el)}
                type="text"
                maxLength={1}
                value={val}
                onChange={(e) => handleOtpChange(e, idx)}
                className="w-12 h-12 text-center border rounded"
              />
            ))}
          </div>
          {timer > 0 ? (
            <p>انتظر {timer} ثانية لإعادة الإرسال</p>
          ) : (
            <button
              onClick={() => {
                setOtp(["", "", "", "", ""]);
                setTimer(60);
                setCanResend(false);
              }}
            >
              إعادة الإرسال
            </button>
          )}
        </>
      );
    }

    if (step === 3) {
      return (
        <>
          <MainInput
            type="password"
            id="new_password"
            name="new_password"
            placeholder="••••••••••"
            label="كلمة المرور"
            icon={<GoLock />}
            value={formik.values.new_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.new_password && formik.errors.new_password}
          />

          <p className="flex items-center gap-2 text-neutral-500">
            <FaRegStickyNote /> يجب أن تحتوى كلمة المرور على أرقام وأحرف ورموز
          </p>

          <div className="h-2 bg-neutral-200 rounded overflow-hidden">
            <div
              style={{
                width: `${(passwordStrength / 4) * 100}%`,
                backgroundColor: getStrengthColor(passwordStrength),
              }}
              className="h-full"
            ></div>
          </div>
        </>
      );
    }
  };

  return (
    <AuthLayout>
      <AuthBreadcrumbs
        title="إستعادة كلمة المرور"
        items={[
          { label: "ضمانة", path: "/" },
          { label: "إستعادة كلمة المرور" },
        ]}
      />

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {renderStep()}
        <FormBtn title={step < 3 ? "التالي" : "تأكيد"} />
      </form>
    </AuthLayout>
  );
};

// Validation per step
const getValidationSchema = (step, method) => {
  if (step === 1) {
    return Yup.object(
      method === "phone"
        ? {
            mobile: Yup.string().required("رقم الهاتف مطلوب"),
          }
        : {
            email: Yup.string()
              .email("البريد الإلكتروني غير صالح")
              .required("البريد الإلكتروني مطلوب"),
          }
    );
  }
  if (step === 3) {
    return Yup.object({
      new_password: Yup.string()
        .required("كلمة المرور مطلوبة")
        .min(8, "كلمة المرور قصيرة")
        .matches(/[A-Z]/, "يجب أن تحتوي على حرف كبير")
        .matches(/\d/, "يجب أن تحتوي على رقم")
        .matches(/[\W_]/, "يجب أن تحتوي على رمز خاص"),
    });
  }
  return Yup.object({});
};

// Helpers for password strength
const calculatePasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[\W_]/.test(password)) strength++;
  return strength;
};

const getStrengthColor = (strength) => {
  if (strength <= 1) return "red";
  if (strength === 2) return "orange";
  if (strength >= 3) return "green";
};

export default MultiStepForgotPassword;
