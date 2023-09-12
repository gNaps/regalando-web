import styles from "./styles/skeleton.styles.module.css";

interface SkeletonProps {
  shape?: "circle" | "rectangle";
  height: string;
  width?: string;
}

const Skeleton = ({ shape, height, width }: SkeletonProps) => {
  return (
    <>
      <div
        className={`${width ? width : "w-full"} ${height} ${styles.skeleton} ${
          shape === "circle" ? "rounded-full" : "rounded"
        } my-2`}
      ></div>
    </>
  );
};

export default Skeleton;
