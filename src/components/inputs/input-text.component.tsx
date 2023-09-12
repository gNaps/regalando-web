import { ReactNode } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputTextProps {
  icon: ReactNode;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  type: "text" | "password" | "email";
  validationSchema: RegisterOptions;
  errors: any;
}

const InputText = ({
  icon,
  placeholder,
  register,
  name,
  type = "text",
  validationSchema,
  errors,
}: InputTextProps) => {
  return (
    <>
      <div className="relative w-full mb-3">
        {icon}
        <input
          className="px-14 py-3 w-full rounded-lg border-2 border-gray bg-transparent placeholder:text-gray"
          type={type}
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

export default InputText;
