import { ReactNode } from "react";

interface InputFakeProps {
  icon: ReactNode;
  placeholder: string;
}

const InputSelect = ({
  icon,
  placeholder,
}: InputFakeProps) => {
  return (
    <>
      <div className="relative w-full mb-3">
        {icon}
        <input
          className="px-14 py-3 w-full rounded-lg border-2 border-gray bg-transparent placeholder:text-gray"
          type="text"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default InputSelect;
