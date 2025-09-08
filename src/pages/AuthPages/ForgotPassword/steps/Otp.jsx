import { useRef, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { checkOtp, checkMobile } from "../../../../services/authService"; // ✅ استدعاء checkMobile
import FormError from "../../../../components/form/FormError";
import FormBtn from "../../../../components/form/FormBtn";
import { useTranslation } from "react-i18next";

const Otp = ({ goNext, parentData, setParentData }) => {
  const { t } = useTranslation();
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Mutation للتحقق من الـ OTP
  const mutation = useMutation({
    mutationFn: checkOtp,
    onSuccess: (data) => {
      setParentData((prev) => ({
        ...prev,
        otp_code: otp.join(""),
        uid: data.data.uid,
        password_reset_token: data.data.password_reset_token,
      }));
      goNext();
    },
    onError: (error) => {
      setErrorMessage(
        error?.response?.data?.error_msg ||
          t("pages.forgotPassword.otp.errors.invalid")
      );
    },
  });

  // ✅ Mutation لإعادة إرسال الكود
  const resendMutation = useMutation({
    mutationFn: checkMobile,
    onSuccess: (data) => {
      // تحديث البيانات من جديد (مهم عشان نحصل على uid/token جديد)
      setParentData((prev) => ({
        ...prev,
        uid: data.data.uid,
        password_reset_token: data.data.password_reset_token,
        otp_code: data.data.otp_code,
      }));
      setOtp(["", "", "", "", ""]);
      setTimer(60);
      setCanResend(false);
      setErrorMessage("");
    },
    onError: (error) => {
      setErrorMessage(
        error?.response?.data?.error_msg ||
          t("pages.forgotPassword.checkMobile.errors.serverError")
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

    // ✅ هنا بنعيد استدعاء checkMobile بنفس الداتا اللي المستخدم دخلها
    const payload = parentData.email
      ? { email: parentData.email, by: "email" }
      : {
          mobile: parentData.mobile,
          country_code: parentData.country_code,
          by: "mobile",
        };

    resendMutation.mutate(payload);
  };

  const handleSubmit = () => {
    const fullCode = otp.join("");
    if (fullCode.length < 5) {
      setErrorMessage(t("pages.forgotPassword.otp.errors.incomplete"));
      return;
    }

    mutation.mutate({
      otp_code: fullCode,
      uid: parentData.uid,
      password_reset_token: parentData.password_reset_token,
    });
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <>
      <p className="text-neutral-500 mb-4">
        {t("pages.Otp.subtitle")}{" "}
        <span className="font-bold text-success-200">
          {parentData.country_code + parentData.mobile}
        </span>
      </p>
      <p className="text-neutral-500 mb-4">
        {t("pages.forgotPassword.otp.instruction")}
      </p>

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
          <span className="text-success-200">
            {t("pages.forgotPassword.otp.timer.resendAllowed")}
          </span>
        )}
      </div>

      <div className="text-center font-semibold mb-6">
        <span className="text-neutral-500">
          {t("pages.forgotPassword.otp.resend.question")}{" "}
        </span>
        <button
          onClick={handleResend}
          disabled={!canResend || resendMutation.isPending}
          className={`${
            canResend
              ? "text-secondary cursor-pointer hover:underline"
              : "text-neutral-400 cursor-not-allowed"
          }`}
        >
          {resendMutation.isPending
            ? t("pages.forgotPassword.otp.resend.loading")
            : t("pages.forgotPassword.otp.resend.button")}
        </button>
      </div>

      <FormError errorMsg={errorMessage} />

      <div className="mt-4">
        <FormBtn
          onClick={handleSubmit}
          title={t("pages.forgotPassword.otp.button.confirm")}
          loading={mutation.isPending}
        />
      </div>
    </>
  );
};

export default Otp;
