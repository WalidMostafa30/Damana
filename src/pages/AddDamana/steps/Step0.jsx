import { LuCircleUserRound, LuFileDigit } from "react-icons/lu";
import MainInput from "../../../components/form/MainInput/MainInput";

const Step0 = ({ formik, getError }) => {
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
              checked={formik.values.owner === "yes"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-5 h-5 accent-primary cursor-pointer"
            />
            نعم
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="owner"
              value="no"
              checked={formik.values.owner === "no"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-5 h-5 accent-primary cursor-pointer"
            />
            لا
          </label>
        </div>
        {getError("owner") && (
          <div className="text-error mt-1">{getError("owner")}</div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          label="الرقم الوطنى للمالك"
          placeholder={"ادخل رقم الوطنى"}
          name="ownerNationalId"
          type="number"
          icon={<LuCircleUserRound />}
        />
        <MainInput
          label="رقم الهاتف للمالك"
          placeholder={"ادخل رقم الهاتف"}
          name="ownerPhone"
          type="tel"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={getError("ownerPhone")}
        />
        <MainInput
          label="رقم تسجيل المركبه"
          placeholder={"ادخل رقم تسجيل المركبه"}
          name="vehicleRegistrationNumber"
          type="number"
          icon={<LuFileDigit />}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="agreement"
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
    </div>
  );
};

export default Step0;
