import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import MainInput from "../../../components/form/MainInput/MainInput";
import { FaIdCard } from "react-icons/fa";
import { CiCreditCard2, CiUser } from "react-icons/ci";
import ActionModal from "../../../components/modals/ActionModal";
import FormError from "../../../components/form/FormError";
import FormBtn from "../../../components/form/FormBtn";
import { checkByRegN } from "../../../services/damanaServices";

const Step0 = ({ goNext, formData, setFormData, profile }) => {
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const mutation = useMutation({
    mutationFn: async (payload) => {
      return await checkByRegN(payload.registration_number);
    },
    onSuccess: (data) => {
      // حفظ بيانات المركبة في formData
      setFormData((prev) => ({
        ...prev,
        ...data,
        registration_number: data.registration_number,
      }));

      setErrorMsg("");
      goNext();
    },
    onError: (error) => {
      setErrorMsg(error?.response?.data?.error_msg || "حدث خطأ أثناء الإرسال");
    },
  });

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true, // مهم عشان يقرأ القيم المحفوظة لو رجعت خطوة
    validationSchema: Yup.object({
      registration_number: Yup.string().required("رقم تسجيل المركبة مطلوب"),
      owner: Yup.string().required("اختيار المالك مطلوب"),
      ownerNationalId: Yup.string().when("owner", {
        is: "no",
        then: (schema) => schema.required("الرقم الوطني للمالك مطلوب"),
        otherwise: (schema) => schema.notRequired(),
      }),
      ownerPhone: Yup.string().when("owner", {
        is: "no",
        then: (schema) => schema.required("رقم هاتف المالك مطلوب"),
        otherwise: (schema) => schema.notRequired(),
      }),
      agreement: Yup.boolean().oneOf([true], "يجب الموافقة على الشروط"),
    }),
    onSubmit: (values) => {
      setErrorMsg("");
      setFormData((prev) => ({ ...prev, ...values })); // حفظ القيم المدخلة
      mutation.mutate(values);
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  const ownerValue = formik.values.owner;

  const modalMsg = (
    <>
      <h3 className="text-lg lg:text-2xl font-bold mb-4">
        تفويض بمشاركة البيانات
      </h3>
      <p className="text-sm lg:text-base">
        أنا الموقع أدناه بصفتي الشخصية عميل لدى ضمانة , أصرح لكم وأوافق على قيام
        البنك العربي وشركة ضمانة بالاستعلام عن البيانات الشخصية العائدة لي
        ومعالجتها من خلال استخدام خدمات واجهة برمجة التطبيقات المفتوحة APIs
        المتوفرة من خلال نظام الربط البيني الحكومي , لأغراض التحقق من ملكية
        المركبة, كما أوافق على قيام البنك العربي بمعالجة بياناتي الشخصية بما
        يشمل الاسم، تاريخ الميلاد، العنوان، ورقم هوية الأحوال المدنية الخاص بي
        لأغراض تنفيذ الحوالات أو لأي غرض آخر لازم لغايات الامتثال بالقوانين
        والأنظمة والتعليمات واللوائح المعمول بها في المملكة. يبقى هذا التفويض
        مستمراً ومنتجا لأثاره دون قيد او شرط طيلة فترة عملية بيع المركبة، وذلك
        ضمن نطاق الاستخدام القانوني المصرّح به ويخضع في جميع الأوقات للرقابة
        الداخلية والتدقيق في البنك العربي
      </p>
    </>
  );

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <h3 className="text-2xl font-bold text-primary">بيانات التسجيل</h3>

      {profile?.account_type === "company" && (
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MainInput
          id={"registration_number"}
          label="رقم تسجيل المركبه"
          placeholder="ادخل رقم تسجيل المركبه"
          name="registration_number"
          type="number"
          value={formik.values.registration_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={getError("registration_number")}
          icon={<CiCreditCard2 />}
        />

        {profile?.account_type === "company" && ownerValue === "no" && (
          <>
            <MainInput
              label="اسم المالك"
              placeholder="ادخل اسم المالك"
              name="ownerName"
              value={formik.values.ownerName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={getError("ownerName")}
              icon={<CiUser />}
            />
            <MainInput
              label="الرقم الوطنى للمالك"
              placeholder="ادخل الرقم الوطنى"
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
              placeholder="ادخل رقم الهاتف"
              name="ownerPhone"
              type="tel"
              value={formik.values.ownerPhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={getError("ownerPhone")}
            />
          </>
        )}
      </div>

      {/* Agreement */}
      <div className="flex items-center flex-wrap gap-2">
        <div className="flex gap-1">
          <input
            type="checkbox"
            name="agreement"
            checked={formik.values.agreement}
            onChange={formik.handleChange}
            id="agreement"
            className="w-5 h-5 accent-primary cursor-pointer"
          />
          <label htmlFor="agreement" className="cursor-pointer">
            أوافق على مشاركة بياناتي لأغراض التحقق حسب الشروط.
          </label>
        </div>
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

      <ActionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        closeBtn
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

      <FormError errorMsg={errorMsg} />

      <FormBtn title="التالي" loading={mutation.isPending} />
    </form>
  );
};

export default Step0;
