import { useRef, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  changeMobileCheckOTP,
  changeMobileSendOTP,
} from "../../../../services/authService";
import FormError from "../../../../components/form/FormError";
import FormBtn from "../../../../components/form/FormBtn";
import ActionModal from "../../../../components/modals/ActionModal";

const MobileSteps2 = ({ newPhoneNumber = {} }) => {
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Mutation
  const mutation = useMutation({
    mutationFn: changeMobileCheckOTP,
    onSuccess: (data) => {
      console.log("OTP verified successfully", data);
      setErrorMessage("");
    },
    onError: (error) => {
      setErrorMessage(
        error?.response?.data?.error_msg || "رمز التحقق غير صحيح"
      );
    },
  });

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
    changeMobileSendOTP.mutate({
      mobile: newPhoneNumber.mobile,
      country_code: newPhoneNumber.country_code,
    });
  };

  const handleSubmit = () => {
    const fullCode = otp.join("");
    if (fullCode.length < 5) {
      setErrorMessage("من فضلك أدخل جميع الأرقام الخمسة");
      return;
    }

    mutation.mutate({
      otp_code: fullCode,
      mobile: newPhoneNumber.mobile,
      country_code: newPhoneNumber.country_code,
    });
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-md">
      <p className="text-neutral-500 mb-4">أدخل الكود المكون من 5 أرقام</p>
      <div className="flex justify-end gap-6 mb-2" dir="ltr">
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

      <div className="mb-4">
        <FormError errorMsg={errorMessage} />
      </div>
      <FormBtn
        onClick={handleSubmit}
        title="تأكيد الكود"
        loading={mutation.isPending}
      />

      <ActionModal
        openModal={mutation.isSuccess}
        msg={"تم تغيير الرقم بنجاح"}
        icon="success"
        primaryBtn={{
          text: "رجوع إلى الملف الشخصي",
          action: () => {
            window.location.reload();
          },
        }}
      />
    </div>
  );
};

export default MobileSteps2;
