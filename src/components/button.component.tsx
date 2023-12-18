interface ButtonProps {
  type?: "button" | "submit";
  theme: "primary" | "secondary" | "danger";
  value: string;
  onClick?: any;
}

const Button = ({ type = "button", theme, value, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full text-center py-3 rounded-lg text-black font-semibold ${
        theme === "primary"
          ? "bg-primary"
          : theme === "secondary"
          ? "bg-white"
          : "bg-red"
      }`}
    >
      {value}
    </button>
  );
};

export default Button;
