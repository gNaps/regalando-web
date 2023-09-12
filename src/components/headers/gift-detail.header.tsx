"use client";

import { nephilm } from "@/app/styles/fonts";
import { ChevronLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface HeaderGiftDetailProps {
  name: string;
  canUpdate: boolean;
  friendId?: string;
}

const HeaderGiftDetail = ({
  name,
  canUpdate,
  friendId,
}: HeaderGiftDetailProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-3 mb-10">
      <ChevronLeftIcon
        className="h-6 w-6 cursor-pointer"
        onClick={() =>
          router.push(friendId ? `/home/friends/${friendId}` : "/home/user")
        }
      />
      <h1 className={`text-3xl ${nephilm.className}`}>{name}</h1>
      {!!canUpdate && (
        <div className="ms-auto">
          <PencilSquareIcon
            className="h-7 w-7 text-primary cursor-pointer"
            onClick={() => console.log("update gift")}
          />
        </div>
      )}
    </div>
  );
};

export default HeaderGiftDetail;
