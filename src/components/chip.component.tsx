interface ChipProps {
  color: "primary" | "white" | "red";
  text: string;
}

const Chip = ({color, text}: ChipProps) => {
  return <span className={`bg-${color} rounded-xl py-1 px-2 text-xs text-black`}>{text}</span>;
};

export default Chip;
