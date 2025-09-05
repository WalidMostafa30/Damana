import { getBanks } from "../../services/staticDataService";
import { useQuery } from "@tanstack/react-query";
import MainInput from "./MainInput/MainInput";
import { CiBank } from "react-icons/ci";
import { useTranslation } from "react-i18next";

const BankSelect = ({ formik, name = "bank_id", disabled }) => {
  const { t } = useTranslation();
  const { data: banksData, isLoading: loadingBanks } = useQuery({
    queryKey: ["banks"],
    queryFn: getBanks,
  });

  const banks = banksData?.data || [];

  const getError = (field) => formik.touched[field] && formik.errors[field];

  const handleChange = (e) => {
    formik.handleChange(e);
    const selectedBank = banks.find((b) => b.id === Number(e.target.value));
    if (selectedBank) {
      formik.setFieldValue("swift_code", selectedBank.swift_code || "");
    }
  };

  return (
    <MainInput
      id={name}
      type="select"
      placeholder={t("components.form.bankSelect.branchName")}
      label={t("components.form.bankSelect.branchName")}
      error={getError(name)}
      value={formik.values[name]}
      onChange={handleChange}
      disabled={disabled}
      icon={<CiBank />}
      options={[
        {
          value: "",
          label: loadingBanks
            ? t("loading")
            : t("components.form.bankSelect.selectBank"),
        },
        ...banks.map((b) => ({ value: b.id, label: b.name })),
      ]}
    />
  );
};

export default BankSelect;
