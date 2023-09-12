import { useCategory } from "@/hooks/useCategories";
import useCurrency from "@/hooks/useCurrency";
import { GiftModel } from "@/models/gift.model";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const GiftItem = ({ id, category, price, name, taken, userId }: GiftModel & {userId?: string}) => {
  return (
    <Link href={userId ? `${userId}/gift/${id}` : `user/gift/${id}`}>
      <div className="w-full rounded-lg px-2 py-3 flex justify-between items-center bg-middle-gray border-2 border-gray my-2">
        <div className="flex gap-3 items-center">
          <p className="text-3xl">{ useCategory(category)?.icon }</p>
          <span>
            <p className="mb-2 font-semibold">{name}</p>
            <p className="">{useCurrency(price)}</p>
          </span>
        </div>
        <ChevronRightIcon className="h-6 w-6" />
      </div>
    </Link>
  );
};

export default GiftItem;
