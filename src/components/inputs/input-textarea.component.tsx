import { ReactNode } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputTextAreaProps {
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  validationSchema: RegisterOptions;
  errors: any;
}

const InputTextArea = ({
  placeholder,
  register,
  name,
  validationSchema,
  errors,
}: InputTextAreaProps) => {
  return (
    <>
      <div className="relative w-full mb-3">
        <textarea
          className="p-3 w-full rounded-lg border-2 border-gray bg-transparent placeholder:text-gray"
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

export default InputTextArea;
