import { RegisterOptions } from "react-hook-form";

export type InputFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  options?: RegisterOptions;
  className?: string;
  showPass?: boolean;
  setShowPass?: (val: boolean) => void;
  selectOptions?: {
    label: string | number;
    value: string | number;
  }[];
};
