import { BsBank } from "react-icons/bs";
import MainInput from "../../../../../components/form/MainInput/MainInput";
import { IoIdCardSharp } from "react-icons/io5";
import { GoFileBinary } from "react-icons/go";
import { IoMdCode } from "react-icons/io";
import { SiBitcoin } from "react-icons/si";
import { FaEarthAsia } from "react-icons/fa6";
import BankSelect from "../../../../../components/form/BankSelect";
import { useState } from "react";

const Step3Company = ({ formik, getError }) => {
  const [swiftCode, setSwiftCode] = useState("");
  return (
    <>
      <p className="text-primary text-lg font-bold">بيانات الحساب البنكي</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <MainInput
          label="اسم البنك"
          id="bank_id"
          name="bank_id"
          placeholder="مثال: البنك الأهلي"
          value={formik.values.bank_id}
          onChange={formik.handleChange}
          error={getError("bank_id")}
          icon={<BsBank />}
        /> */}
        <BankSelect formik={formik} setSwiftCode={setSwiftCode} />

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
          value={swiftCode}
          onChange={formik.handleChange}
          error={getError("swift_code")}
          icon={<IoMdCode />}
          disabled
        />

        <MainInput
          type="select"
          label="العملة"
          id="currency"
          name="currency"
          value={formik.values.currency}
          onChange={formik.handleChange}
          error={getError("currency")}
          icon={<SiBitcoin />}
          options={[
            {
              value: "",
              label: "اختر العمله",
            },
            ...["JOD", "SAR", "USD", "EUR"].map((c) => ({
              value: c,
              label: c,
            })),
          ]}
        />

        <MainInput
          label="اسم المستخدم (CLIQ) (اختياري)"
          id="clik_name"
          name="clik_name"
          placeholder="مثال: user@bank.com"
          value={formik.values.clik_name}
          onChange={formik.handleChange}
          error={getError("clik_name")}
          icon={<IoIdCardSharp />}
        />

        {/* <MainInput
          label="اسم المصرح بالبيانات"
          id="info_name"
          name="info_name"
          placeholder="مثال: أحمد علي"
          value={formik.values.info_name}
          onChange={formik.handleChange}
          error={getError("info_name")}
          icon={<IoIdCardSharp />}
        /> */}
      </div>
    </>
  );
};

export default Step3Company;
