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
          <label htmlFor={name} className="text-sm">
            {label}
          </label>
          <textarea
            className="mt-1"
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
          <label htmlFor={name} className="text-sm">
            {label}
          </label>
          <select className="mt-1" {...register(name, options)}>
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
          <label htmlFor={name} className="text-sm">
            {label}
          </label>
          <div>
            <input className="mt-1" type={type} {...register(name, options)} />
            Checkbox
          </div>
          {error && (
            <p className="md:text-sm text-xs font-light text-red-500">
              {error}
            </p>
          )}
        </>
      ) : type === "text" || type === "number" ? (
        <>
          <label htmlFor={name} className="text-sm">
            {label}
          </label>
          <input
            className="mt-1"
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
