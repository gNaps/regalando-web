import { ReactNode } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputDateProps {
  icon: ReactNode;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  validationSchema: RegisterOptions;
  errors: any;
}

const InputDate = ({
  icon,
  placeholder,
  register,
  name,
  validationSchema,
  errors,
}: InputDateProps) => {
  return (
    <>
      <div className="relative w-full mb-3">
        {icon}
        <input
          className="px-14 py-3 w-full rounded-lg border-2 border-gray bg-transparent placeholder:text-gray"
          type="date"
          placeholder={placeholder}
          {...register(name, validationSchema)}
          name={name}
          id={name}
        />
        {errors && errors[name]?.type === "required" && (
          <span className="text-red text-xs">{errors[name]?.message}</span>
        )}
      </div>
    </>
  );
};

export default InputDate;
