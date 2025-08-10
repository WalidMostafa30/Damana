import { useRef, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { checkOtpRegister, sendOtp } from "../../../../services/authService";
import FormError from "../../../../components/form/FormError";
import FormBtn from "../../../../components/form/FormBtn";
import AuthBreadcrumbs from "../../../../components/common/AuthBreadcrumbs";
import AuthLayout from "../../../../components/common/AuthLayout";

const Otp = () => {
  const location = useLocation();
  const { mobile, country_code } = location.state || {};

  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Mutation: إرسال OTP
  const sendOtpMutation = useMutation({
    mutationFn: () => sendOtp({ mobile, country_code }),
    onSuccess: (data) => {
      console.log("تم إرسال الكود ✅", data);
    },
    onError: () => {
      setErrorMessage("فشل إرسال رمز التحقق");
    },
  });

  // Mutation: التحقق من OTP
  const checkOtpMutation = useMutation({
    mutationFn: checkOtpRegister,
    onSuccess: (data) => {
      console.log("OTP صحيح ✅", data);
      navigate("/complete-register");
    },
    onError: (error) => {
      setErrorMessage(
        error?.response?.data?.error_msg || "رمز التحقق غير صحيح"
      );
    },
  });

  // أول ما الصفحة تفتح أرسل الكود
  useEffect(() => {
    if (mobile && country_code) {
      sendOtpMutation.mutate();
    }
  }, [mobile, country_code]);

  // مؤقت إعادة الإرسال
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setErrorMessage("");
    if (value && index < otp.length - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(["", "", "", "", ""]);
    setTimer(60);
    setCanResend(false);
    setErrorMessage("");
    if (mobile && country_code) {
      sendOtpMutation.mutate();
    }
  };

  const handleSubmit = () => {
    const fullCode = otp.join("");
    if (fullCode.length < 5) {
      setErrorMessage("من فضلك أدخل جميع الأرقام الخمسة");
      return;
    }
    console.log("الكود:", fullCode);

    checkOtpMutation.mutate({ otp_code: fullCode });
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <AuthLayout>
      <AuthBreadcrumbs
        title="التحقق من رمز التحقق"
        items={[
          { label: "ضمانة", path: "/" },
          { label: "التحقق من رمز التحقق" },
        ]}
      />

      <p className="text-neutral-500 mb-4">أدخل الكود المكون من 5 أرقام</p>
      <div className="flex gap-6 mb-2" dir="ltr">
        {otp.map((value, index) => {
          const isError = errorMessage && value === "";
          return (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-12 h-12 bg-white text-center text-xl font-bold rounded-md outline-none ring-2 ${
                isError
                  ? "ring-error-100 focus:ring-error-100"
                  : "ring-neutral-300 focus:ring-secondary"
              }`}
            />
          );
        })}
      </div>

      <div className="text-center text-neutral-600 mb-3">
        {timer > 0 ? (
          <span>{formatTime(timer)}</span>
        ) : (
          <span className="text-success-200">يمكنك الآن إعادة إرسال الكود</span>
        )}
      </div>

      <div className="text-center font-semibold mb-6">
        <span className="text-neutral-500">لم يصل الكود؟ </span>
        <button
          onClick={handleResend}
          disabled={!canResend}
          className={`${
            canResend
              ? "text-secondary cursor-pointer hover:underline"
              : "text-neutral-400 cursor-not-allowed"
          }`}
        >
          إعادة الإرسال
        </button>
      </div>

      <FormError errorMsg={errorMessage} />

      <FormBtn
        onClick={handleSubmit}
        title="تأكيد الكود"
        loading={checkOtpMutation.isPending}
      />
    </AuthLayout>
  );
};

export default Otp;
