import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import StepProgressCol from "../../components/common/StepProgress/StepProgressCol";
import MainInput from "../../components/form/MainInput/MainInput";

const steps = [
  "المعلومات الأساسية",
  "بيانات الأطراف",
  "بيانات الضمانة",
  "تأكيد الإرسال",
];

const validationSchemas = [
  Yup.object({
    owner: Yup.string().required("اختيار المالك مطلوب"),
    regNumber: Yup.string().required("رقم التسجيل مطلوب"),
  }),
  Yup.object({
    nationalId: Yup.string().required("الرقم الوطني مطلوب"),
    phone: Yup.string().required("رقم الهاتف مطلوب"),
  }),
  Yup.object({
    guaranteeAmount: Yup.number()
      .required("قيمة الضمانة مطلوبة")
      .positive("يجب إدخال قيمة موجبة"),
    code: Yup.string().required("الكود مطلوب"),
  }),
];

const AddDamana = () => {
  const [step, setStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      owner: "",
      regNumber: "",
      nationalId: "",
      phone: "",
      guaranteeAmount: "",
      code: "",
    },
    validationSchema: validationSchemas[step],
    onSubmit: (values) => {
      if (step < steps.length - 1) {
        setStep((prev) => prev + 1);
        formik.setTouched({});
      } else {
        console.log("Final Form Values:", values);
      }
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  return (
    <section className="pageContainer space-y-4">
      <h2 className="text-3xl font-bold">طلب ضمانة جديدة</h2>
      <p className="text-lg text-neutral-500">
        ابدأ بإنشاء ضمانة جديدة للمركبة التي تود ببيعها
      </p>

      <section className="p-4 rounded-lg border border-neutral-300 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <aside>
          <StepProgressCol steps={steps} currentStep={step} />
        </aside>

        <div className="col-span-1 lg:col-span-2 space-y-4 p-4 bg-base-white rounded-lg shadow-lg">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* --- Step 0 --- */}
            {step === 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">
                  بيانات التسجيل
                </h3>

                {/* Radio owner */}
                <div>
                  <label className="block mb-2 font-semibold">
                    هل أنت المالك؟
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="owner"
                        value="yes"
                        checked={formik.values.owner === "yes"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-4 h-4 accent-secondary cursor-pointer"
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
                        className="w-4 h-4 accent-secondary cursor-pointer"
                      />
                      لا
                    </label>
                  </div>
                  {getError("owner") && (
                    <div className="text-error mt-1">{getError("owner")}</div>
                  )}
                </div>

                <MainInput
                  label="رقم تسجيل المركبة"
                  name="regNumber"
                  value={formik.values.regNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={getError("regNumber")}
                />
              </div>
            )}

            {/* --- Step 1 --- */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">
                  بيانات الأطراف
                </h3>

                <MainInput
                  label="الرقم الوطني"
                  name="nationalId"
                  value={formik.values.nationalId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={getError("nationalId")}
                />

                <MainInput
                  label="رقم الهاتف"
                  name="phone"
                  type="tel"
                  value={formik.values.phone}
                  onChange={(value) => formik.setFieldValue("phone", value)}
                  onBlur={formik.handleBlur}
                  error={getError("phone")}
                />
              </div>
            )}

            {/* --- Step 2 --- */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">
                  بيانات الضمانة
                </h3>

                <MainInput
                  label="قيمة الضمانة"
                  name="guaranteeAmount"
                  type="number"
                  value={formik.values.guaranteeAmount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={getError("guaranteeAmount")}
                />

                <MainInput
                  label="كود الخصم"
                  name="code"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={getError("code")}
                />
              </div>
            )}

            {/* --- Step 3 --- */}
            {step === 3 && (
              <div>
                <h3 className="text-2xl font-bold text-primary">
                  تأكيد وإرسال
                </h3>
                <p className="text-neutral-600">
                  برجاء مراجعة البيانات جيداً قبل الإرسال.
                </p>
                <pre className="bg-gray-100 p-4 rounded mt-4">
                  {JSON.stringify(formik.values, null, 2)}
                </pre>
              </div>
            )}

            {/* --- Buttons --- */}
            <div className="flex justify-between">
              <button type="submit" className="mainBtn">
                {step === steps.length - 1 ? "إرسال" : "التالي"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
};

export default AddDamana;
