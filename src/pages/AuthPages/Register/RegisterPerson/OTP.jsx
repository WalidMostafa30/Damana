import { useRef, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  checkOtpRegister,
  checkOtpRegisterFlow2,
  logoutUser,
  sendOtp,
  sendOtpFlow2,
} from "../../../../services/authService";
import FormError from "../../../../components/form/FormError";
import FormBtn from "../../../../components/form/FormBtn";
import AuthBreadcrumbs from "../../../../components/common/AuthBreadcrumbs";
import AuthLayout from "../../../../components/common/AuthLayout";
import ActionModal from "../../../../components/modals/ActionModal";
import { useTranslation } from "react-i18next";
import LoadingModal from "../../../../components/modals/LoadingModal";

const Otp = () => {
  const { t } = useTranslation();
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { flow = 1, mobile, country_code, ref_key } = location.state || {};

  const sendOtpFn =
    flow === 2
      ? () => sendOtpFlow2({ mobile, country_code, ref_key })
      : () => sendOtp();

  const checkOtpFn = flow === 2 ? checkOtpRegisterFlow2 : checkOtpRegister;

  // Mutation: إرسال OTP
  const sendOtpMutation = useMutation({
    mutationFn: sendOtpFn,

    onError: (error) => {
      setErrorMessage(
        error?.response?.data?.error_msg || t("pages.Otp.errors.send_failed")
      );
    },
  });

  // Mutation: التحقق من OTP
  const checkOtpMutation = useMutation({
    mutationFn: checkOtpFn,
    onSuccess: () => {
      if (flow === 2) {
        setOpenModal(true);
      } else {
        // navigate("/complete-register");
        navigate("/");
      }
    },
    onError: (error) => {
      setErrorMessage(
        error?.response?.data?.error_msg || t("pages.Otp.errors.invalid")
      );
    },
  });

  // أول ما الصفحة تفتح أرسل الكود
  useEffect(() => {
    sendOtpMutation.mutate();
  }, []);

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
    sendOtpMutation.mutate();
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSubmit = () => {
    const fullCode = otp.join("");
    if (fullCode.length < 5) {
      setErrorMessage(t("pages.Otp.errors.incomplete"));
      return;
    }

    const payload = { otp_code: fullCode };

    if (flow === 2) {
      payload.ref_key = ref_key;
      payload.mobile = mobile;
      payload.country_code = country_code;
    }

    checkOtpMutation.mutate(payload);
  };

  const logoutMutation = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      navigate("/login");
    },
  });

  return (
    <AuthLayout>
      <AuthBreadcrumbs
        title={t("pages.Otp.title")}
        items={[
          { label: t("pages.RegisterPerson.breadcrumbs.home"), path: "/" },
          { label: t("pages.Otp.breadcrumb") },
        ]}
      />

      <p className="text-neutral-500 mb-4">
        {t("pages.Otp.subtitle")}{" "}
        <span className="font-bold text-success-200">
          {country_code + mobile}
        </span>
      </p>
      <p className="text-neutral-500 mb-4">{t("pages.Otp.instruction")}</p>

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
            {t("pages.Otp.resend_timer")}
          </span>
        )}
      </div>

      <div className="text-center font-semibold mb-6">
        <span className="text-neutral-500">
          {t("pages.Otp.resend_prompt")}{" "}
        </span>
        <button
          onClick={handleResend}
          disabled={!canResend}
          className={`${
            canResend
              ? "text-secondary cursor-pointer hover:underline"
              : "text-neutral-400 cursor-not-allowed"
          }`}
        >
          {t("pages.Otp.resend_button")}
        </button>
      </div>

      <div className="mb-4">
        <FormError errorMsg={errorMessage} />
      </div>

      <FormBtn
        onClick={handleSubmit}
        title={t("pages.Otp.submit_button")}
        loading={checkOtpMutation.isPending}
      />

      <p
        onClick={() => logoutMutation.mutate()}
        className="text-secondary font-semibold text-center cursor-pointer mt-2"
      >
        {t("components.layout.headerActions.logout")}
      </p>

      <ActionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        icon="warning"
        msg={t("pages.Otp.modal.title")}
        primaryBtn={{
          text: t("pages.Otp.modal.login_button"),
          action: () => navigate("/login"),
        }}
        lightBtn={{
          text: t("pages.Otp.modal.forgot_password_button"),
          action: () => navigate("/forgot-password"),
        }}
      />
      <LoadingModal openModal={logoutMutation.isPending} />
    </AuthLayout>
  );
};

export default Otp;
