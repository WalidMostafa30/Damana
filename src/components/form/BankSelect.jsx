import { getBanks } from "../../services/authService";
import { useQuery } from "@tanstack/react-query";

const BankSelect = ({ formik, name = "bank_id" }) => {
  // جلب البنوك
  const { data: banksData, isLoading: loadingBanks } = useQuery({
    queryKey: ["banks"],
    queryFn: getBanks,
  });
  const banks = banksData?.data || [];

  const getError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <MainInput
      id={name}
      type="select"
      placeholder="اسم الفرع"
      label="اسم الفرع"
      error={getError(name)}
      value={formik.values[name]}
      onChange={formik.handleChange}
      disabled={loadingBanks}
      icon={<CiBank />}
      options={[
        { value: "", label: "اختر البنك" },
        ...banks.map((b) => ({ value: b.id, label: b.name })),
      ]}
    />
  );
};

export default BankSelect;
