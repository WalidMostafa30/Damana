import {
  Landmark,
  CreditCard,
  Globe,
  ShieldCheck,
  BadgeDollarSign,
  Building2,
  User,
} from "lucide-react";
import MainInput from "../../../../../components/form/MainInput/MainInput";

const Step3Company = ({ formik, getError }) => {
  return (
    <>
      <p className="text-primary text-lg font-bold">بيانات الحساب البنكي</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          label="اسم البنك"
          id="bankName"
          name="bankName"
          placeholder="مثال: البنك الأهلي"
          value={formik.values.bankName}
          onChange={formik.handleChange}
          error={getError("bankName")}
          icon={<Landmark />}
        />

        <MainInput
          label="رقم الحساب"
          id="accountNumber"
          name="accountNumber"
          placeholder="مثال: 1234567890"
          value={formik.values.accountNumber}
          onChange={formik.handleChange}
          error={getError("accountNumber")}
          icon={<CreditCard />}
        />

        <MainInput
          label="رقم الحساب الدولي (IBAN)"
          id="iban"
          name="iban"
          placeholder="مثال: SA4420000001234567891234"
          value={formik.values.iban}
          onChange={formik.handleChange}
          error={getError("iban")}
          icon={<Globe />}
        />

        <MainInput
          label="رقم السويفت (SWIFT Code)"
          id="swiftCode"
          name="swiftCode"
          placeholder="مثال: NBEGEGCXXXX"
          value={formik.values.swiftCode}
          onChange={formik.handleChange}
          error={getError("swiftCode")}
          icon={<ShieldCheck />}
        />

        <MainInput
          label="العملة"
          id="currencyBank"
          name="currencyBank"
          placeholder="مثال: ريال سعودي"
          value={formik.values.currencyBank}
          onChange={formik.handleChange}
          error={getError("currencyBank")}
          icon={<BadgeDollarSign />}
        />

        <MainInput
          label="الفرع"
          id="branch"
          name="branch"
          placeholder="مثال: فرع الرياض"
          value={formik.values.branch}
          onChange={formik.handleChange}
          error={getError("branch")}
          icon={<Building2 />}
        />

        <MainInput
          label="اسم المستخدم (CLIQ)"
          id="cliqUser"
          name="cliqUser"
          placeholder="مثال: user@bank.com"
          value={formik.values.cliqUser}
          onChange={formik.handleChange}
          error={getError("cliqUser")}
          icon={<User />}
        />
      </div>
    </>
  );
};

export default Step3Company;
