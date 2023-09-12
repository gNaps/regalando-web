"use client";

import { nephilm } from "@/app/styles/fonts";
import { PlusCircleIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const HeaderMyGifts = () => {
  return (
    <div className="flex items-center justify-between mb-10">
      <h1 className={`text-3xl ${nephilm.className}`}>My gifts</h1>
      <div className="flex items-center gap-5">
        <UserGroupIcon
          className="h-7 w-7 text-white cursor-pointer"
          onClick={() => console.log("add new user")}
        />
        <PlusCircleIcon
          className="h-7 w-7 text-primary cursor-pointer"
          onClick={() => console.log("add new gift")}
        />
      </div>
    </div>
  );
};

export default HeaderMyGifts;
