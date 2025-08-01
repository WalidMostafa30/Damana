import { LuCircleUserRound, LuFileDigit } from "react-icons/lu";
import MainInput from "../../../components/form/MainInput/MainInput";
import { FaIdCard } from "react-icons/fa";
import { CiCreditCard2 } from "react-icons/ci";
import ActionModal from "../../../components/modals/ActionModal";
import { useState } from "react";

const Step0 = ({ formik, getError }) => {
  const ownerValue = formik.values.owner;
  const [openModal, setOpenModal] = useState(false);
  const modalMsg = (
    <>
      <h3 className="text-lg lg:text-2xl font-bold mb-4">
        تفويض بمشاركة البيانات
      </h3>
      <p className="text-sm lg:text-base">
        أنا الموقع أدناه بصفتي الشخصية عميل لدى ضمانة , أصرح لكم وأوافق على قيام
        البنك العربي وشركة ضمانة  بالاستعلام عن البيانات الشخصية العائدة لي
        ومعالجتها من خلال استخدام خدمات واجهة برمجة التطبيقات المفتوحة APIs
        المتوفرة من خلال نظام الربط البيني الحكومي , لأغراض التحقق من ملكية
        المركبة, كما أوافق على قيام البنك العربي بمعالجة بياناتي الشخصية بما
        يشمل الاسم، تاريخ الميلاد، العنوان، ورقم هوية الأحوال المدنية الخاص بي
        لأغراض تنفيذ الحوالات أو لأي غرض آخر لازم لغايات الامتثال بالقوانين
        والأنظمة والتعليمات واللوائح المعمول بها في المملكة.  يبقى هذا التفويض
        مستمراً ومنتجا لأثاره دون قيد او شرط طيلة فترة عملية بيع المركبة، وذلك
        ضمن نطاق الاستخدام القانوني المصرّح به ويخضع في جميع الأوقات للرقابة
        الداخلية والتدقيق في البنك العربي
      </p>
    </>
  );

  return (
    <>
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
            id={"vehicleRegistrationNumber"}
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
          </label>
          <span
            onClick={() => setOpenModal(true)}
            className="underline text-secondary cursor-pointer"
          >
            (عرض النص الكامل للتفويض)
          </span>
        </div>
        {getError("agreement") && (
          <div className="text-error-200 mt-1">{getError("agreement")}</div>
        )}
      </div>

      <ActionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        msg={modalMsg}
        icon="protect"
        primaryBtn={{
          text: "أوافق على الشروط و المتابعه",
          action: () => {
            formik.setFieldValue("agreement", true);
            setOpenModal(false);
          },
        }}
        lightBtn={{ text: "العوده", action: () => setOpenModal(false) }}
      />
    </>
  );
};

export default Step0;
