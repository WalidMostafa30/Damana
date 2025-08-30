import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AuthBreadcrumbs from "../../../../components/common/AuthBreadcrumbs";
import AuthLayout from "../../../../components/common/AuthLayout";
import MainInput from "../../../../components/form/MainInput/MainInput";
import { CiUser } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import { FaRegStickyNote } from "react-icons/fa";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import FormError from "../../../../components/form/FormError";
import FormBtn from "../../../../components/form/FormBtn";
import { registerPerson } from "../../../../services/authService";
import PhoneInput from "../../../../components/form/PhoneInput";
import ActionModal from "../../../../components/modals/ActionModal";

const RegisterPerson = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordValue, setPasswordValue] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  // حساب قوة الباسورد
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;
    return strength;
  };

  const getStrengthLabel = () => {
    if (passwordStrength <= 1) return "ضعيفة";
    if (passwordStrength === 2) return "متوسطة";
    if (passwordStrength >= 3) return "قوية";
  };

  const getStrengthColor = () => {
    if (passwordStrength === 1) return "var(--color-error-200)";
    if (passwordStrength === 2) return "var(--color-warning-200)";
    if (passwordStrength >= 3) return "var(--color-success-200)";
    return "transparent";
  };

  // Mutation للتسجيل
  const registerMutation = useMutation({
    mutationFn: registerPerson,
    onSuccess: async (data, variables) => {
      const state = {};
      if (data?.error_code === 1101) {
        state.mobile = variables.mobile;
        state.country_code = variables.country_code;
        state.flow = 2;
        state.ref_key = data?.ref_key;
      }
      navigate("/register-otp", { state });
    },
    onError: (error) => {
      setErrorMsg(error?.response?.data?.error_msg || "حدث خطأ أثناء التسجيل");
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "", // ✅ جديد
      mobile: "",
      country_code: "",
      password: "",
      password_confirmation: "",
      accept_policy_terms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("الاسم مطلوب")
        .min(3, "الاسم يجب أن لا يقل عن 3 حروف"),
      email: Yup.string()
        .required("البريد الإلكتروني مطلوب")
        .email("يجب إدخال بريد إلكتروني صحيح"), // ✅ جديد
      mobile: Yup.string()
        .required("رقم الهاتف مطلوب")
        .min(9, "رقم الهاتف يجب أن يحتوي على 9 أرقام على الأقل"),
      password: Yup.string()
        .required("كلمة المرور مطلوبة")
        .min(8, "كلمة المرور يجب ان تكون على الاقل 8 حروف")
        .matches(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
        .matches(/\d/, "يجب أن تحتوي على رقم واحد على الأقل")
        .matches(/[\W_]/, "يجب أن تحتوي على رمز خاص واحد على الأقل"),
      password_confirmation: Yup.string()
        .required("تأكيد كلمة المرور مطلوب")
        .oneOf([Yup.ref("password"), null], "كلمة المرور غير متطابقة"),
      accept_policy_terms: Yup.bool().oneOf(
        [true],
        "يجب الموافقة على الشروط قبل التسجيل"
      ),
    }),
    onSubmit: (values) => {
      setErrorMsg("");
      const payload = {
        name: values.name,
        email: values.email, // ✅ جديد
        mobile: values.mobile,
        country_code: values.country_code,
        password: values.password,
        password_confirmation: values.password_confirmation,
      };
      registerMutation.mutate(payload);
    },
  });

  const getError = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";

  return (
    <AuthLayout>
      <AuthBreadcrumbs
        title="أهلاً في ضمانة!"
        items={[{ label: "ضمانة", path: "/" }, { label: "انشاء حساب جديد" }]}
      />

      <div className="mb-8">
        <h3 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4">
          اكد هويتك الشخصية
        </h3>
        <p className="text-sm lg:text-base text-neutral-500">
          حتى تتمكن من انشاء معامله فى ضمانة, واستخدام ميزات التطبيق, اكد هويتك
          وبيانات البنك الخاص بك
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* الاسم */}
          <MainInput
            label="الاسم"
            id="name"
            name="name"
            placeholder="اسم المستخدم"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={getError("name")}
            icon={<CiUser />}
          />

          {/* الهاتف */}
          <PhoneInput formik={formik} />

          {/* البريد الإلكتروني ✅ جديد */}
          <MainInput
            label="البريد الإلكتروني"
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={getError("email")}
            icon={<MdOutlineMarkEmailUnread />}
          />

          {/* كلمة المرور */}
          <MainInput
            type="password"
            id="password"
            name="password"
            placeholder="••••••••••"
            label="كلمة المرور"
            icon={<GoLock />}
            value={formik.values.password}
            onChange={(e) => {
              formik.handleChange(e);
              setPasswordValue(e.target.value);
              setPasswordStrength(calculatePasswordStrength(e.target.value));
            }}
            onBlur={formik.handleBlur}
            error={getError("password")}
          />

          {/* تأكيد كلمة المرور */}
          <MainInput
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            placeholder="••••••••••"
            label="تاكيد كلمة المرور"
            icon={<GoLock />}
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={getError("password_confirmation")}
          />
        </div>

        {/* ملاحظات كلمة المرور */}
        <p className="flex items-center gap-2 text-neutral-500">
          <FaRegStickyNote className="text-2xl" />
          يجب أن تحتوى كلمة المرور على أرقام وأحرف ورموز ولا تقل عن 8 حروف
        </p>

        {/* مؤشر القوة */}
        <div className="flex items-center gap-2 mt-2">
          <div className="h-2 w-1/2 rounded-full bg-neutral-200 overflow-hidden">
            <div
              className="h-full transition-all duration-300 rounded-full"
              style={{
                width: `${(passwordStrength / 4) * 100}%`,
                backgroundColor: getStrengthColor(),
              }}
            />
          </div>
          {passwordValue && (
            <p
              className="text-sm font-semibold"
              style={{ color: getStrengthColor() }}
            >
              قوة كلمة المرور ( {getStrengthLabel()} )
            </p>
          )}
        </div>

        {/* Checkbox سياسة الخصوصية */}
        <label className="flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            name="accept_policy_terms"
            checked={formik.values.accept_policy_terms}
            onChange={(e) =>
              formik.setFieldValue("accept_policy_terms", e.target.checked)
            }
            className="h-5 w-5 accent-primary focus:ring-primary"
          />
          <span>
            الموافقة على سياسة{" "}
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="text-primary font-semibold cursor-pointer underline"
            >
              الخصوصية و شروط استخدام ضمانة
            </button>{" "}
          </span>
        </label>
        {getError("accept_policy_terms") && (
          <p className="text-error-100">{getError("accept_policy_terms")}</p>
        )}

        {/* مودال الشروط */}
        <ActionModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          closeBtn
          msg={
            <>
              <h3 className="text-lg lg:text-2xl font-bold">
                تفويض بمشاركة البيانات
              </h3>
              <p className="text-sm lg:text-base">
                أنا الموقع أدناه بصفتي الشخصية عميل لدى ضمانة , أصرح لكم وأوافق
                على قيام البنك العربي وشركة ضمانة بالاستعلام عن البيانات الشخصية
                ...
              </p>
            </>
          }
          icon="protect"
          primaryBtn={{
            text: "أوافق على الشروط و المتابعه",
            action: () => {
              formik.setFieldValue("accept_policy_terms", true);
              setOpenModal(false);
            },
          }}
          lightBtn={{ text: "العوده", action: () => setOpenModal(false) }}
        />

        {/* الأخطاء */}
        <FormError errorMsg={errorMsg} />

        <FormBtn title="انشاء حساب" loading={registerMutation.isPending} />

        <p className="text-center font-semibold text-sm lg:text-base">
          هل تمتلك حساب بالفعل؟{" "}
          <Link
            to="/login"
            className="text-secondary hover:brightness-50 transition-colors"
          >
            تسجيل دخول
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPerson;
