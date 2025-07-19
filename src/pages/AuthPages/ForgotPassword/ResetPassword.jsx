import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";

const ResetPassword = () => {
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const correctCode = "00000";
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setErrorMessage("");

    if (value && index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
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
    console.log("تم إعادة إرسال الكود ✅");
  };

  const handleSubmit = () => {
    const fullCode = otp.join("");

    if (fullCode.length < 5) {
      setErrorMessage("من فضلك أدخل جميع الأرقام الخمسة");
      return;
    }

    if (fullCode !== correctCode) {
      setErrorMessage("رمز التحقق غير صحيح");
      return;
    }

    console.log("OTP submitted:", fullCode);
    navigate("/auth/create-new-password");
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">هل نسيت كلمة المرور ؟</h2>

        <Breadcrumbs
          items={[
            { label: "ضمانة", path: "/" },
            { label: "نسيان كلمة المرور", path: "/auth/forgot-password" },
            { label: "ادخال كود التحقق" },
          ]}
        />
      </div>

      <p className="text-neutral-500 mb-4">
        قم بإضافه الكود المكون من 5 أرقام لاسترجاع كلمة المرور
      </p>

      <div className="flex gap-6 mb-2">
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
              className={`w-12 h-12 text-center text-xl font-bold rounded-md outline-none ring-2 ${
                isError
                  ? "ring-error-100 focus:ring-error-100"
                  : "ring-neutral-300 focus:ring-secondary"
              }`}
            />
          );
        })}
      </div>

      {errorMessage && (
        <p className="text-error-100 font-semibold mb-4">{errorMessage}</p>
      )}

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

      <button onClick={handleSubmit} className="mainBtn">
        تأكيد الكود
      </button>
    </>
  );
};

export default ResetPassword;
