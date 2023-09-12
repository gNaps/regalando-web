"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import ProfilePicture from "../profile-picture.component";
import { nephilm } from "@/app/styles/fonts";
import { useRouter } from "next/navigation";

interface HeaderFriendGiftsProps {
  picture: string;
  username: string;
}

const HeaderFriendGifts = ({ picture, username }: HeaderFriendGiftsProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-3 mb-10">
      <ChevronLeftIcon className="h-6 w-6 cursor-pointer" onClick={() => router.push('/home/friends')} />
      <ProfilePicture size="medium" shape="circle" url={picture} />
      <h1 className={`text-3xl ${nephilm.className}`}>{username} gifts</h1>
    </div>
  );
};

export default HeaderFriendGifts;
