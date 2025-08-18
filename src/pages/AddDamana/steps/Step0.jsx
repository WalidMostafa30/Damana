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
import PhoneInput from "../../../components/form/PhoneInput";

const Step0 = ({ goNext, formData, setFormData, profile }) => {
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const mutation = useMutation({
    mutationFn: async (payload) => {
      return await checkByRegN({
        registration_number: payload.registration_number,
        is_owner: payload.is_owner,
        owner_national_number: payload.owner_national_number,
      });
    },
    onSuccess: (data) => {
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
    enableReinitialize: true,
    validationSchema: Yup.object({
      registration_number: Yup.string().required("رقم تسجيل المركبة مطلوب"),
      is_owner: Yup.boolean()
        .oneOf([true, false], "اختيار المالك مطلوب")
        .required("اختيار المالك مطلوب"),
      owner_national_number: Yup.string().when("is_owner", {
        is: false,
        then: (schema) => schema.required("الرقم الوطني للمالك مطلوب"),
        otherwise: (schema) => schema.notRequired(),
      }),
      owner_full_mobile: Yup.string().when("is_owner", {
        is: false,
        then: (schema) => schema.required("رقم هاتف المالك مطلوب"),
        otherwise: (schema) => schema.notRequired(),
      }),
      agreement: Yup.boolean().oneOf([true], "يجب الموافقة على الشروط"),
    }),
    onSubmit: (values) => {
      console.log("Submitting values:", values);

      setErrorMsg("");
      setFormData((prev) => ({ ...prev, ...values }));
      mutation.mutate(values);
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  const modalMsg = (
    <>
      <h3 className="text-lg lg:text-2xl font-bold">تفويض بمشاركة البيانات</h3>
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
                name="is_owner"
                checked={formik.values.is_owner === true}
                onChange={() => formik.setFieldValue("is_owner", true)}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
              نعم
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="is_owner"
                checked={formik.values.is_owner === false}
                onChange={() => formik.setFieldValue("is_owner", false)}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
              لا
            </label>
          </div>
          {getError("is_owner") && (
            <div className="text-error mt-1">{getError("is_owner")}</div>
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

        {profile?.account_type === "company" &&
          formik.values.is_owner === false && (
            <>
              <MainInput
                label="الرقم الوطنى للمالك"
                id={"owner_national_number"}
                placeholder="ادخل الرقم الوطنى"
                name="owner_national_number"
                type="number"
                value={formik.values.owner_national_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={getError("owner_national_number")}
                icon={<FaIdCard />}
              />

              <PhoneInput
                formik={formik}
                name="owner_full_mobile"
                combineValue
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
