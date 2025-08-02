import { BsBank } from "react-icons/bs";
import MainInput from "../../../../../components/form/MainInput/MainInput";
import { IoIdCardSharp } from "react-icons/io5";
import { GoFileBinary } from "react-icons/go";
import { IoMdCode } from "react-icons/io";
import { SiBitcoin } from "react-icons/si";
import { FaEarthAsia } from "react-icons/fa6";

const Step3Company = ({ formik, getError }) => {
  return (
    <>
      <p className="text-primary text-lg font-bold">بيانات الحساب البنكي</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          label="اسم البنك"
          id="bank_name"
          name="bank_name"
          placeholder="مثال: البنك الأهلي"
          value={formik.values.bank_name}
          onChange={formik.handleChange}
          error={getError("bank_name")}
          icon={<BsBank />}
        />

        <MainInput
          label="رقم الحساب"
          id="account_number"
          name="account_number"
          placeholder="مثال: 1234567890"
          value={formik.values.account_number}
          onChange={formik.handleChange}
          error={getError("account_number")}
          icon={<IoIdCardSharp />}
        />

        <MainInput
          label="رقم الحساب الدولي (IBAN)"
          id="iban"
          name="iban"
          placeholder="مثال: SA4420000001234567891234"
          value={formik.values.iban}
          onChange={formik.handleChange}
          error={getError("iban")}
          icon={<GoFileBinary />}
        />

        <MainInput
          label="رقم السويفت (SWIFT Code)"
          id="swift_code"
          name="swift_code"
          placeholder="مثال: NBEGEGCXXXX"
          value={formik.values.swift_code}
          onChange={formik.handleChange}
          error={getError("swift_code")}
          icon={<IoMdCode />}
        />

        <MainInput
          label="العملة"
          id="currency"
          name="currency"
          placeholder="مثال: ريال سعودي"
          value={formik.values.currency}
          onChange={formik.handleChange}
          error={getError("currency")}
          icon={<SiBitcoin />}
        />

        <MainInput
          label="الفرع"
          id="branch"
          name="branch"
          placeholder="مثال: فرع الرياض"
          value={formik.values.branch}
          onChange={formik.handleChange}
          error={getError("branch")}
          icon={<FaEarthAsia />}
        />

        <MainInput
          label="اسم المستخدم (CLIQ)"
          id="clik_name"
          name="clik_name"
          placeholder="مثال: user@bank.com"
          value={formik.values.clik_name}
          onChange={formik.handleChange}
          error={getError("clik_name")}
          icon={<IoIdCardSharp />}
        />

        <MainInput
          label="اسم المصرح بالبيانات"
          id="info_name"
          name="info_name"
          placeholder="مثال: أحمد علي"
          value={formik.values.info_name}
          onChange={formik.handleChange}
          error={getError("info_name")}
          icon={<IoIdCardSharp />}
        />
      </div>
    </>
  );
};

export default Step3Company;
