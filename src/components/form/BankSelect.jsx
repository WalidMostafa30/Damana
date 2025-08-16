import { getBanks } from "../../services/staticDataService";
import { useQuery } from "@tanstack/react-query";
import MainInput from "./MainInput/MainInput";
import { CiBank } from "react-icons/ci";

const BankSelect = ({ formik, name = "bank_id", setSwiftCode, disabled }) => {
  const { data: banksData, isLoading: loadingBanks } = useQuery({
    queryKey: ["banks"],
    queryFn: getBanks,
  });

  const banks = banksData?.data || [];

  const getError = (field) => formik.touched[field] && formik.errors[field];

  const handleChange = (e) => {
    formik.handleChange(e);
    if (setSwiftCode) {
      const selectedBank = banks.find((b) => b.id === Number(e.target.value));
      setSwiftCode(selectedBank?.swift_code || "");
    }
  };

  return (
    <MainInput
      id={name}
      type="select"
      placeholder="اسم الفرع"
      label="اسم الفرع"
      error={getError(name)}
      value={formik.values[name]}
      onChange={handleChange}
      disabled={loadingBanks || disabled}
      icon={<CiBank />}
      options={[
        { value: "", label: "اختر البنك" },
        ...banks.map((b) => ({ value: b.id, label: b.name })),
      ]}
    />
  );
};

export default BankSelect;
