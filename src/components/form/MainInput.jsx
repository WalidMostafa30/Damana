import React, { useState } from "react";
import { CircleAlert, Eye, EyeOff } from "lucide-react";

const MainInput = React.forwardRef(
  (
    {
      type = "text",
      value,
      onChange,
      placeholder,
      label,
      id,
      icon,
      error,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    if (type === "select") {
      return (
        <div>
          {label && (
            <label htmlFor={id} className="block w-fit font-semibold mb-2">
              {label}
            </label>
          )}

          <div
            className={`flex items-center gap-2 p-4 rounded-lg ring-2 ${
              error
                ? "ring-error-100"
                : "ring-neutral-300 focus-within:ring-secondary"
            } transition-all`}
          >
            {icon && <span className="text-neutral-500">{icon}</span>}

            <select
              id={id}
              value={value}
              onChange={onChange}
              className="flex-1 text-lg outline-none border-none"
              {...rest}
            >
              {rest.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }

    return (
      <div>
        {label && (
          <label htmlFor={id} className="block w-fit font-semibold mb-2">
            {label}
          </label>
        )}

        <div
          className={`flex items-center gap-2 p-4 rounded-lg ring-2 ${
            error
              ? "ring-error-100"
              : "ring-neutral-300 focus-within:ring-secondary"
          } transition-all`}
        >
          {icon && <span className="text-neutral-500">{icon}</span>}

          <input
            type={inputType}
            id={id}
            value={value}
            onChange={onChange}
            ref={ref}
            className="flex-1 text-lg outline-none border-none"
            placeholder={placeholder}
            {...rest}
          />

          {isPassword && (
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="text-neutral-500 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          )}
        </div>

        {error && (
          <p className="mt-2 flex items-center gap-2">
            <CircleAlert className="text-error-100" /> {error}
          </p>
        )}
      </div>
    );
  }
);

export default MainInput;
