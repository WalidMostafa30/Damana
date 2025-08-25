import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdCloudUpload } from "react-icons/md";
import MainInput from "../../../../../components/form/MainInput/MainInput";

const Step6CompanyLoginAccounts = ({ formik }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [tempLogin, setTempLogin] = useState({
    login_name: "",
    login_phone: "",
    authorizationFile: null,
  });
  const [errors, setErrors] = useState({});

  const login_accounts = formik.values.login_accounts || {};

  const validate = () => {
    let newErrors = {};
    if (!tempLogin.login_name.trim()) {
      newErrors.login_name = "الاسم مطلوب";
    }
    if (!tempLogin.login_phone.trim()) {
      newErrors.login_phone = "رقم الهاتف مطلوب";
    }
    if (!tempLogin.authorizationFile) {
      newErrors.authorizationFile = "ملف التفويض مطلوب";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddLogin = () => {
    if (validate()) {
      formik.setFieldValue("login_accounts", tempLogin); // ✅ يخزن حساب واحد بس
      setTempLogin({
        login_name: "",
        login_phone: "",
        authorizationFile: null,
      });
      setErrors({});
      setShowLoginForm(false); // ✅ يقفل الفورم بعد الإضافة
    }
  };

  const removeLogin = () => {
    formik.setFieldValue("login_accounts", []); // ✅ يمسح الحساب
    setShowLoginForm(false); // يرجع يقدر يضيف تاني
  };

  return (
    <div className="mt-4">
      {/* الزرار يظهر فقط لو مفيش حساب مضاف */}
      {!login_accounts.length && !showLoginForm && (
        <button
          type="button"
          className="mb-4 flex items-center gap-1 text-primary cursor-pointer"
          onClick={() => setShowLoginForm(true)}
        >
          <FaCirclePlus className="text-2xl" />
          إضافة حساب تسجيل دخول جديد
        </button>
      )}

      {showLoginForm && (
        <div className="mb-6 baseWhiteContainer">
          <p className="text-primary text-lg font-bold mb-4">
            بيانات حساب جديد
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MainInput
              label="الاسم"
              value={tempLogin.login_name}
              onChange={(e) =>
                setTempLogin({ ...tempLogin, login_name: e.target.value })
              }
              error={errors.login_name}
            />

            <PhoneField
              value={tempLogin.login_phone}
              onChange={(val) =>
                setTempLogin({ ...tempLogin, login_phone: val })
              }
              combineValue
            />
            {errors.login_phone && (
              <p className="text-error-100">{errors.login_phone}</p>
            )}

            <div className="md:col-span-2">
              <FileInput
                label="ملف خطاب التفويض"
                value={tempLogin.authorizationFile}
                onChange={(file) =>
                  setTempLogin({ ...tempLogin, authorizationFile: file })
                }
                error={errors.authorizationFile}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddLogin}
            className="px-4 py-2 bg-primary text-white rounded-lg mt-4 hover:brightness-90 cursor-pointer"
          >
            إضافة
          </button>
        </div>
      )}

      {/* عرض الحساب الوحيد */}
      {login_accounts.length > 0 && (
        <div className="mt-4">
          <p className="font-bold mb-2">الحساب المضاف:</p>

          <div className="p-2 rounded-lg bg-secondary/10 flex items-center gap-2">
            <span>{login_accounts[0].login_name}</span>
            <button
              type="button"
              className="text-error-100 text-2xl cursor-pointer"
              onClick={removeLogin}
            >
              <IoCloseCircleOutline />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step6CompanyLoginAccounts;

// ---------------- FileInput Component -----------------
const FileInput = ({ label, value, onChange, error }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files) => {
    if (files && files[0]) {
      onChange(files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all duration-300 ${
          dragActive ? "border-primary bg-primary/5" : "border-gray-300"
        } hover:border-primary`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,image/*"
          onChange={(event) => handleFiles(event.currentTarget.files)}
          className="hidden"
          id={`file-input-${label}`}
        />

        <label
          htmlFor={`file-input-${label}`}
          className="cursor-pointer flex flex-col items-center"
        >
          <MdCloudUpload className="mx-auto text-gray-400 text-5xl" />
          {!value ? (
            <p className="text-sm text-gray-500 mt-2">
              اسحب الملف هنا أو اضغط لاختياره
            </p>
          ) : (
            <p className="text-sm text-green-600 mt-2">📄 {value.name}</p>
          )}
        </label>
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// ---------------- Phone Input Component -----------------
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { PiWarningCircleBold } from "react-icons/pi";

const PhoneField = ({
  label = "رقم الهاتف",
  value,
  onChange,
  error,
  disabled = false,
}) => {
  return (
    <div>
      {label && (
        <label className="block w-fit font-semibold mb-2 text-sm lg:text-base">
          {label}
        </label>
      )}

      <div dir="ltr">
        <PhoneInput
          country={"jo"}
          value={value}
          onChange={(phone, country) => onChange(phone, country)}
          inputClass={`form-control !w-full !h-auto !p-3 lg:p-4 !ps-14 !text-lg !rounded-lg !border-none !outline-none !transition-all
            !ring-2 ${
              error
                ? "!ring-error-100"
                : "!ring-neutral-300 focus:!ring-secondary"
            } ${
            disabled ? "!bg-gray-100 !opacity-60 !cursor-not-allowed" : ""
          }`}
          dropdownClass="!text-lg !bg-white !shadow-lg"
          buttonClass="!text-lg !bg-gray-100 !border-none !rounded-s-lg"
          disabled={disabled}
        />
      </div>

      {error && (
        <p className="mt-2 flex items-center gap-1 text-sm text-error-100">
          <PiWarningCircleBold className="text-xl" />
          {error}
        </p>
      )}
    </div>
  );
};
