import React, { useState } from "react";
import { CircleAlert, Eye, EyeOff } from "lucide-react";

const MainInput = ({
  label,
  icon,
  type = "text",
  options = [],
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const commonInputClasses = `w-full text-lg outline-none border-none py-4 ${
    isPassword ? "px-9" : type === "date" ? "px-2" : "ps-9 pe-2"
  } rounded-lg ring-2 ${
    error ? "ring-error-100" : "ring-neutral-300 focus-within:ring-secondary"
  } transition-all`;

  const commonLabel = label && (
    <label
      htmlFor={props.id || props.name}
      className="block w-fit font-semibold mb-2"
    >
      {label}
    </label>
  );

  const commonError = error && (
    <p className="mt-2 flex items-center gap-1 text-sm">
      <CircleAlert className="text-error-100" size={18} /> {error}
    </p>
  );

  if (type === "textarea") {
    return (
      <div>
        {commonLabel}
        <textarea {...props} className={`${commonInputClasses} h-32 resize-none ps-2!`} />
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
            <span className="text-neutral-500 absolute top-1/2 -translate-y-1/2 start-2 pointer-events-none">
              {icon}
            </span>
          )}
          <select {...props} className={commonInputClasses}>
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
        <input {...props} type="date" className={commonInputClasses} />
        {commonError}
      </div>
    );
  }

  return (
    <div>
      {commonLabel}
      <div className="relative">
        {icon && (
          <span className="text-neutral-500 absolute top-1/2 -translate-y-1/2 start-2 pointer-events-none">
            {icon}
          </span>
        )}
        <input {...props} type={inputType} className={commonInputClasses} />
        {isPassword && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="text-neutral-500 cursor-pointer absolute top-1/2 -translate-y-1/2 end-2"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        )}
      </div>
      {commonError}
    </div>
  );
};

export default MainInput;
