import { useState } from "react";
import { useTranslation } from "react-i18next";
import MainInput from "../../../../../components/form/MainInput/MainInput";
import { IoIdCardSharp } from "react-icons/io5";
import { GoFileBinary } from "react-icons/go";
import { IoMdCode } from "react-icons/io";
import { SiBitcoin } from "react-icons/si";
import BankSelect from "../../../../../components/form/BankSelect";
import ActionModal from "../../../../../components/modals/ActionModal";

const Step3Company = ({ formik, getError }) => {
  const { t } = useTranslation();
  const [openIbanWarning, setOpenIbanWarning] = useState(false); // 🟡 مودال التحذير

  // ✅ تنظيف الـ IBAN من المسافات وتحويله لحروف كبيرة
  const cleanIban = (value) =>
    value ? value.replace(/\s+/g, "").toUpperCase() : "";

  // 🟢 عند الخروج من حقل الـ IBAN نتحقق من الطول ونفتح المودال
  const handleIbanBlur = (e) => {
    formik.handleBlur(e);
    const value = cleanIban(formik.values.iban);
    if (value.length === 30) {
      setOpenIbanWarning(true);
    }
  };

  return (
    <>
      <p className="text-primary text-lg font-bold">
        {t("pages.Step3Company.title")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BankSelect مع النص من الترجمة */}
        <BankSelect
          formik={formik}
          label={t("pages.Step3Company.bankSelect.label")}
        />

        {/* 🟢 IBAN */}
        <MainInput
          label={t("pages.Step3Company.iban.label")}
          id="iban"
          name="iban"
          placeholder={t("pages.Step3Company.iban.placeholder")}
          value={formik.values.iban}
          onChange={(e) => {
            const cleaned = e.target.value.replace(/\s+/g, "").toUpperCase();
            formik.setFieldValue("iban", cleaned);
          }}
          onBlur={handleIbanBlur} // 🟢 نضيف هنا
          error={getError("iban")}
          icon={<GoFileBinary />}
        />

        {/* SWIFT Code */}
        <MainInput
          label={t("pages.Step3Company.swift_code.label")}
          id="swift_code"
          name="swift_code"
          placeholder={t("pages.Step3Company.swift_code.placeholder")}
          value={formik.values.swift_code}
          onChange={formik.handleChange}
          error={getError("swift_code")}
          icon={<IoMdCode />}
        />

        {/* العملة */}
        <MainInput
          type="select"
          label={t("pages.Step3Company.currency.label")}
          id="currency"
          name="currency"
          value={formik.values.currency}
          onChange={formik.handleChange}
          error={getError("currency")}
          icon={<SiBitcoin />}
          options={[
            {
              value: "",
              label: t("pages.Step3Company.currency.defaultOption"),
            },
            ...["JOD", "SAR", "USD", "EUR"].map((c) => ({
              value: c,
              label: t(`pages.Step3Company.currency.options.${c}`),
            })),
          ]}
        />

        {/* CLIQ Name */}
        <MainInput
          label={t("pages.Step3Company.clik_name.label")}
          id="clik_name"
          name="clik_name"
          placeholder={t("pages.Step3Company.clik_name.placeholder")}
          value={formik.values.clik_name}
          onChange={formik.handleChange}
          error={getError("clik_name")}
          icon={<IoIdCardSharp />}
        />
      </div>

      {/* 🟡 مودال تحذير IBAN */}
      <ActionModal
        openModal={openIbanWarning}
        msg={t("iban_warning")}
        icon="warning"
        primaryBtn={{
          text: "حسنًا",
          action: () => setOpenIbanWarning(false),
        }}
      />
    </>
  );
};

export default Step3Company;
