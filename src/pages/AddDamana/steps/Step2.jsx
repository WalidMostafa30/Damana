import { Backpack, Building, Building2, Code, Landmark } from "lucide-react";
import MainInput from "../../../../../components/form/MainInput/MainInput";

const Step2 = ({ formik, getError }) => {
  return (
    <>
      <h3 className="text-xl font-bold mb-4">البيانات البنكية</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          label="اسم البنك"
          id="bankName"
          name="bankName"
          placeholder="بنك الاتحاد"
          value={formik.values.bankName}
          onChange={formik.handleChange}
          error={getError("bankName")}
          icon={<Landmark />}
        />
        <MainInput
          label="الفرع"
          id="branch"
          name="branch"
          placeholder="ادخار"
          value={formik.values.branch}
          onChange={formik.handleChange}
          error={getError("branch")}
          icon={<Building />}
        />
        <MainInput
          label="رمز سويفت"
          id="swiftCode"
          name="swiftCode"
          placeholder="AAA564"
          value={formik.values.swiftCode}
          onChange={formik.handleChange}
          error={getError("swiftCode")}
          icon={<Code />}
        />
      </div>

      <h3 className="text-2xl font-bold mb-4">بيانات الحساب</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          label="رقم الحساب"
          id="accountNumber"
          name="accountNumber"
          placeholder="55890064"
          type="number"
          value={formik.values.accountNumber}
          onChange={formik.handleChange}
          error={getError("accountNumber")}
          icon={<Building2 />}
        />
        <MainInput
          label="الايبان البنكي (الحساب الدولي)"
          id="iban"
          name="iban"
          placeholder="PS33PALS004612813490013100000"
          type="number"
          value={formik.values.iban}
          onChange={formik.handleChange}
          error={getError("iban")}
          icon={<Backpack />}
        />
      </div>
    </>
  );
};

export default Step2;
