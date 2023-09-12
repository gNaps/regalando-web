"use client"

import { UserCircleIcon } from "@heroicons/react/24/outline";

interface ProfilePictureProps {
  size: "small" | "medium" | "large";
  shape: "circle" | "square";
  url: string;
}

const ProfilePicture = ({ size, shape, url }: ProfilePictureProps) => {
  const sizeClass =
    size === "small"
      ? "h-6 w-6"
      : size === "medium"
      ? "h-12 w-12"
      : "h-32 w-32";
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-lg";
  return url ? (
    <div
      className={`${sizeClass} ${shapeClass} bg-cover bg-center`}
      style={{ backgroundImage: `url(${url}` }}
    ></div>
  ) : (
    <div className={`${sizeClass}`}>
      <UserCircleIcon className={`${sizeClass}`} />
    </div>
  );
};

export default ProfilePicture;
