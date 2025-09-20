import { useFormik } from "formik";
import * as Yup from "yup";
import MainInput from "../../components/form/MainInput/MainInput";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { sendSupportMessage } from "../../services/authService";
import FormError from "../../components/form/FormError";
import FormBtn from "../../components/form/FormBtn";
import { useState } from "react";
import ActionModal from "../../components/modals/ActionModal";

const Support = () => {
  const [errMsg, setErrMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  // ✅ Mutation باستخدام React Query
  const { mutate, isPending } = useMutation({
    mutationFn: sendSupportMessage,
    onSuccess: () => {
      formik.resetForm();
      setErrMsg("");
      setOpenModal(true);
    },
    onError: (error) => {
      setErrMsg(error?.response?.data?.error_msg || "An error occurred");
    },
  });

  const schema = Yup.object({
    message: Yup.string().required(t("pages.account.support.messageRequired")),
  });

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      mutate({ message: values.message });
    },
  });

  const getError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <>
      <h3 className="text-lg lg:text-2xl text-primary font-bold">
        {t("pages.account.support.title")}
      </h3>

      <p className="text-neutral-500 lg:text-lg">
        {t("pages.account.support.description")}
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <MainInput
          label={t("pages.account.support.messageLabel")}
          id={"message"}
          type="textarea"
          name="message"
          value={formik.values.message}
          error={getError("message")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <FormError errorMsg={errMsg} />

        <FormBtn
          title={t("pages.account.support.submit")}
          loading={isPending}
        />
      </form>

      <ActionModal
        openModal={openModal}
        msg={t("pages.account.support.success_msg")}
        icon="success"
        primaryBtn={{
          text: t("update_damana_modal.btn"),
          action: () => {
            setOpenModal(false);
          },
        }}
      />
    </>
  );
};

export default Support;
