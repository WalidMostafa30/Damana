import { BsBank } from "react-icons/bs";
import MainInput from "../../../../../components/form/MainInput/MainInput";
import { FaCodeBranch } from "react-icons/fa";
import { IoCode } from "react-icons/io5";
import { PiMoney } from "react-icons/pi";
import { LuHandCoins } from "react-icons/lu";

const Step2 = ({ formik, getError }) => {
  return (
    <>
      <h3 className="text-xl font-bold mb-2 lg:mb-4">البيانات البنكية</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          label="اسم البنك"
          id="bank_name"
          name="bank_name"
          placeholder="بنك الاتحاد"
          value={formik.values.bank_name}
          onChange={formik.handleChange}
          error={getError("bank_name")}
          icon={<BsBank />}
        />
        <MainInput
          label="الفرع"
          id="branch"
          name="branch"
          placeholder="ادخار"
          value={formik.values.branch}
          onChange={formik.handleChange}
          error={getError("branch")}
          icon={<FaCodeBranch />}
        />
        <MainInput
          label="رمز سويفت"
          id="swift_code"
          name="swift_code"
          placeholder="AAA564"
          value={formik.values.swift_code}
          onChange={formik.handleChange}
          error={getError("swift_code")}
          icon={<IoCode />}
        />
      </div>

      <h3 className="text-xl font-bold mb-2 lg:mb-4">بيانات الحساب</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          label="رقم الحساب"
          id="account_number"
          name="account_number"
          placeholder="55890064"
          type="number"
          value={formik.values.account_number}
          onChange={formik.handleChange}
          error={getError("account_number")}
          icon={<LuHandCoins />}
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
          icon={<PiMoney />}
        />
      </div>
    </>
  );
};

export default Step2;
