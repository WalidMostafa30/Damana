import { LuCircleUserRound, LuFileDigit } from "react-icons/lu";
import MainInput from "../../../components/form/MainInput/MainInput";
import { FaIdCard } from "react-icons/fa";
import { CiCreditCard2 } from "react-icons/ci";

const Step0 = ({ formik, getError }) => {
  const ownerValue = formik.values.owner;

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-primary">بيانات التسجيل</h3>

      {/* Radio owner */}
      <div>
        <label className="block mb-2 font-semibold">هل أنت المالك؟</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="owner"
              value="yes"
              checked={ownerValue === "yes"}
              onChange={formik.handleChange}
              className="w-5 h-5 accent-primary cursor-pointer"
            />
            نعم
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="owner"
              value="no"
              checked={ownerValue === "no"}
              onChange={formik.handleChange}
              className="w-5 h-5 accent-primary cursor-pointer"
            />
            لا
          </label>
        </div>
        {getError("owner") && (
          <div className="text-error mt-1">{getError("owner")}</div>
        )}
      </div>

      {/* لو مش المالك يظهر الحقول الإضافية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ownerValue === "no" && (
          <>
            <MainInput
              label="الرقم الوطنى للمالك"
              placeholder={"ادخل الرقم الوطنى"}
              name="ownerNationalId"
              type="number"
              value={formik.values.ownerNationalId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={getError("ownerNationalId")}
              icon={<FaIdCard />}
            />
            <MainInput
              label="رقم الهاتف للمالك"
              placeholder={"ادخل رقم الهاتف"}
              name="ownerPhone"
              type="tel"
              value={formik.values.ownerPhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={getError("ownerPhone")}
            />
          </>
        )}
        {/* هذا الحقل دائمًا يظهر */}
        <MainInput
          label="رقم تسجيل المركبه"
          placeholder={"ادخل رقم تسجيل المركبه"}
          name="vehicleRegistrationNumber"
          type="number"
          value={formik.values.vehicleRegistrationNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={getError("vehicleRegistrationNumber")}
          icon={<CiCreditCard2 />}
        />
      </div>

      {/* Agreement */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="agreement"
          checked={formik.values.agreement}
          onChange={formik.handleChange}
          id="agreement"
          className="w-5 h-5 rounded-full accent-primary cursor-pointer"
        />
        <label htmlFor="agreement" className="cursor-pointer">
          أوافق على مشاركة بياناتي لأغراض التحقق حسب الشروط.{" "}
          <span className="underline text-secondary">
            (عرض النص الكامل للتفويض)
          </span>
        </label>
      </div>
      {getError("agreement") && (
        <div className="text-error-200 mt-1">{getError("agreement")}</div>
      )}
    </div>
  );
};

export default Step0;
