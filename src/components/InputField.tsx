import { useFormContext } from "react-hook-form";
import { InputFieldProps } from "../types";

const InputField = ({
  name,
  label,
  placeholder,
  type,
  options,
  className,
}: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error: string = (errors[name]?.message as string) || "";

  return (
    <div className={`flex flex-col ${className}`}>
      {type === "textarea" ? (
        <>
          <label htmlFor={name} className="text-sm dark:text-white">
            {label}
          </label>
          <textarea
            className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
            rows={4}
            placeholder={placeholder}
            {...register(name, options)}
          ></textarea>
          {error && (
            <p className="md:text-sm text-xs font-light text-red-500">
              {error}
            </p>
          )}
        </>
      ) : type === "select" ? (
        <>
          <label htmlFor={name} className="text-sm dark:text-white">
            {label}
          </label>
          <select
            className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
            {...register(name, options)}
          >
            <option value={""} disabled>
              {placeholder}
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          {error && (
            <p className="md:text-sm text-xs font-light text-red-500">
              {error}
            </p>
          )}
        </>
      ) : type === "checkbox" ? (
        <>
          <label htmlFor={name} className="text-sm dark:text-white">
            {label}
          </label>
          <div>
            <input
              className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
              type={type}
              {...register(name, options)}
            />
            Checkbox
          </div>
          {error && (
            <p className="md:text-sm text-xs font-light text-red-500">
              {error}
            </p>
          )}
        </>
      ) : type === "text" || type === "number" || type === "email" ? (
        <>
          <label htmlFor={name} className="text-sm dark:text-white">
            {label}
          </label>
          <input
            className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
            type={type}
            placeholder={placeholder}
            {...register(name, options)}
          />
          {error && (
            <p className="md:text-sm text-xs font-light text-red-500">
              {error}
            </p>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputField;
