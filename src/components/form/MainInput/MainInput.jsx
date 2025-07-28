import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "./MainInput.css";
import "react-phone-input-2/lib/style.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { PiWarningCircleBold } from "react-icons/pi";

const MainInput = ({
  label,
  icon,
  type = "text",
  options = [],
  error,
  id,
  value,
  onChange,
  onBlur,
  placeholder,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const commonInputClasses = `w-full text-lg bg-white outline-none border-none py-3 ${
    isPassword ? "px-9" : type === "date" ? "px-2" : "ps-9 pe-2"
  } rounded-lg ring-2 ${
    error ? "ring-error-100" : "ring-neutral-300 focus-within:ring-secondary"
  } transition-all ${
    disabled ? "opacity-60 cursor-not-allowed bg-gray-100" : ""
  }`;

  const commonLabel = label && (
    <label htmlFor={id} className="block w-fit font-semibold mb-2 text-sm lg:text-base">
      {label}
    </label>
  );

  const commonError = error && (
    <p className="mt-2 flex items-center gap-1 text-sm">
      <PiWarningCircleBold className="text-error-100 text-2xl" />
      {error}
    </p>
  );

  if (type === "textarea") {
    return (
      <div>
        {commonLabel}
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`${commonInputClasses} h-32 resize-none ps-2!`}
        />
        {commonError}
      </div>
    );
  }

  if (type === "select") {
    return (
      <div>
        {commonLabel}
        <div className="relative">
          {icon && (
            <span className="text-neutral-500 absolute top-1/2 -translate-y-1/2 start-2 pointer-events-none text-2xl">
              {icon}
            </span>
          )}
          <select
            id={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={commonInputClasses}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {commonError}
      </div>
    );
  }

  if (type === "date") {
    return (
      <div>
        {commonLabel}
        <input
          id={id}
          type="date"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={commonInputClasses}
        />
        {commonError}
      </div>
    );
  }

  if (type === "tel") {
    return (
      <div>
        {commonLabel}
        <div dir="ltr">
          <PhoneInput
            id={id}
            country={"jo"}
            value={value}
            onChange={(phone) => onChange(phone)}
            inputClass={`form-control !w-full !h-auto !p-3 lg:p-4 !ps-14 !text-lg !rounded-lg !border-none !outline-none !ring-2 
            !ring-neutral-300 focus:!ring-secondary transition-all ${
              error
                ? "!ring-error-100"
                : "!ring-neutral-300 focus-within:!ring-secondary"
            } ${
              disabled ? "!bg-gray-100 !opacity-60 !cursor-not-allowed" : ""
            }`}
            dropdownClass="!text-lg !bg-white !shadow-lg"
            buttonClass="!text-lg !bg-gray-100 !border-none !rounded-s-lg"
            disabled={disabled}
          />
        </div>
        {commonError}
      </div>
    );
  }

  return (
    <div>
      {commonLabel}
      <div className="relative">
        {icon && (
          <span className="text-neutral-500 absolute top-1/2 -translate-y-1/2 start-2 pointer-events-none text-2xl">
            {icon}
          </span>
        )}

        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={commonInputClasses}
        />

        {isPassword && (
          <span
            onClick={() => !disabled && setShowPassword(!showPassword)}
            className={`text-neutral-500 cursor-pointer absolute top-1/2 -translate-y-1/2 end-2 text-2xl ${
              disabled ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        )}
      </div>
      {commonError}
    </div>
  );
};

export default MainInput;
