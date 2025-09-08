import { useState } from "react";
import MainInput from "../../components/form/MainInput/MainInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { completeRegister } from "../../services/authService";
import FormError from "../../components/form/FormError";
import FormBtn from "../../components/form/FormBtn";
import { GoFileBinary } from "react-icons/go";
import { SiBitcoin } from "react-icons/si";
import { IoIdCardSharp } from "react-icons/io5";
import { IoMdCode } from "react-icons/io";
import BankSelect from "../../components/form/BankSelect";
import { isValid } from "iban";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const BankInfo = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 🟢 جلب بيانات البروفايل من الـ Redux
  const { profile } = useSelector((state) => state.profile);
  const userBank = profile?.user_bank || {};

  // 🟢 Mutation للتعديل على البيانات البنكية
  const mutation = useMutation({
    mutationFn: completeRegister,
    onSuccess: () => {
      toast.success(t("pages.account.bank_info.success"));
      setIsEditing(false);
    },
    onError: (error) => {
      setErrorMsg(
        error?.response?.data?.error_msg || t("pages.account.bank_info.error")
      );
    },
  });

  // 🟢 الفاليديشن مع الـ 5 حقول
  const bankSchema = Yup.object({
    bank_id: Yup.string().required(t("pages.account.bank_info.bank_required")),
    iban: Yup.string()
      .test("iban-check", t("pages.account.bank_info.iban_invalid"), (value) =>
        isValid(value || "")
      )
      .required(t("pages.account.bank_info.iban_required")),
    swift_code: Yup.string().required(
      t("pages.account.bank_info.swift_required")
    ),
    currency: Yup.string().required(
      t("pages.account.bank_info.currency_required")
    ),
    clik_name: Yup.string(),
  });

  // 🟢 Formik بنفس أسماء الـ API
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bank_id: userBank.bank_id || "",
      iban: userBank.iban || "",
      swift_code: userBank.swift_code || "",
      currency: userBank.currency || "",
      clik_name: userBank.clik_name || "",
    },
    validationSchema: bankSchema,
    onSubmit: (values) => {
      setErrorMsg("");
      mutation.mutate({
        form_type: "bank",
        bank: values,
      });
    },
  });

  const getError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg lg:text-2xl text-primary font-bold">
          {t("pages.account.bank_info.title")}
        </h3>

        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className={`border border-neutral-300 px-4 py-2 rounded-xl flex items-center gap-2 lg:text-lg cursor-pointer ${
            isEditing ? "bg-secondary/30 border-secondary/30" : ""
          }`}
        >
          <FaRegEdit />
          {t("pages.account.bank_info.edit")}
        </button>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 🟢 البنك */}
          <BankSelect formik={formik} disabled={!isEditing} />

          {/* 🟢 IBAN */}
          <MainInput
            label={t("pages.account.bank_info.iban")}
            id="iban"
            name="iban"
            placeholder={t("pages.account.bank_info.iban_placeholder")}
            value={formik.values.iban}
            onChange={formik.handleChange}
            error={getError("iban")}
            icon={<GoFileBinary />}
            disabled={!isEditing}
          />

          {/* 🟢 SWIFT Code */}
          <MainInput
            label={t("pages.account.bank_info.swift")}
            id="swift_code"
            name="swift_code"
            placeholder={t("pages.account.bank_info.swift_placeholder")}
            value={formik.values.swift_code}
            onChange={formik.handleChange}
            error={getError("swift_code")}
            icon={<IoMdCode />}
            disabled={!isEditing}
          />

          {/* 🟢 العملة */}
          <MainInput
            type="select"
            label={t("pages.account.bank_info.currency")}
            id="currency"
            name="currency"
            value={formik.values.currency}
            onChange={formik.handleChange}
            error={getError("currency")}
            icon={<SiBitcoin />}
            disabled={!isEditing}
            options={[
              {
                value: "",
                label: t("pages.account.bank_info.currency_select"),
              },
              ...["JOD", "SAR", "USD", "EUR"].map((c) => ({
                value: c,
                label: c,
              })),
            ]}
          />

          {/* 🟢 CLIQ */}
          <MainInput
            label={t("pages.account.bank_info.cliq")}
            id="clik_name"
            name="clik_name"
            placeholder={t("pages.account.bank_info.cliq_placeholder")}
            value={formik.values.clik_name}
            onChange={formik.handleChange}
            error={getError("clik_name")}
            disabled={!isEditing}
            icon={<IoIdCardSharp />}
          />
        </div>

        <FormError errorMsg={errorMsg} />

        {isEditing && (
          <FormBtn
            title={t("pages.account.bank_info.save")}
            loading={mutation.isPending}
            className="lg:col-span-2"
          />
        )}
      </form>
    </>
  );
};

export default BankInfo;
