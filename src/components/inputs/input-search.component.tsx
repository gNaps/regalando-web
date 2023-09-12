import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputSearchProps {
  placeholder: string;
  name: string;
  onChange?: any;
}

const InputSearch = ({ placeholder, name, onChange }: InputSearchProps) => {
  return (
    <>
      <div className="relative w-full mb-3">
        <MagnifyingGlassIcon className="h-8 w-8 text-gray absolute inset-y-2 inset-x-3" />
        <input
          className="px-14 py-3 w-full rounded-lg border-2 border-gray bg-transparent placeholder:text-gray"
          type="text"
          placeholder={placeholder}
          id={name}
          onChange={(e) => onChange(e)}
        />
      </div>
    </>
  );
};

export default InputSearch;
