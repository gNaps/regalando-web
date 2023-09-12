"use client";

import useCurrency from "@/hooks/useCurrency";
import HeaderGiftDetail from "./headers/gift-detail.header";
import {
  BuildingStorefrontIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Button from "./button.component";

interface GiftDetailProps {
  userId?: string;
  username?: string;
  canUpdate: boolean;
  name: string;
  description: string;
  price: number;
  retail_store: string;
  online_store: string;
  taken: string;
  id: number
}

const GiftDetail = ({
  userId,
  name,
  canUpdate,
  description,
  price,
  retail_store,
  online_store,
  taken,
  username,
  id
}: GiftDetailProps) => {
  return (
    <div className="flex flex-col flex-1">
      <HeaderGiftDetail name={name} canUpdate={canUpdate} friendId={userId} giftId={id} />

      <div className="mb-5">
        <h1 className="text-2xl font-semibold mb-2">What is?</h1>
        <div className="py-3 px-2 bg-middle-gray rounded-lg">
          <p>{description}</p>
        </div>
      </div>
      <div className="mb-5">
        <h1 className="text-2xl font-semibold mb-2">How much?</h1>
        <div className="py-3 px-2 bg-middle-gray rounded-lg">
          <p>{useCurrency(price)}</p>
        </div>
      </div>
      <div className="mb-5">
        <h1 className="text-2xl font-semibold mb-2">Where?</h1>
        <div className="py-3 px-2 bg-middle-gray rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <BuildingStorefrontIcon className="h-6 w-6" />
            {retail_store || "No retail store indicated"}
          </div>
          <div className="flex items-center gap-2">
            <GlobeAltIcon className="h-6 w-6" />
            {online_store ? (
              <Link
                href={online_store}
                target="_blank"
                className="font-bold text-primary"
              >
                Open link
              </Link>
            ) : (
              "No online store indicated"
            )}
          </div>
        </div>
      </div>
      {!canUpdate && !taken && (
        <div className="flex-1 flex items-end">
          <Button theme="primary" value={`Gift to ${username}`} />
        </div>
      )}
    </div>
  );
};

export default GiftDetail;
