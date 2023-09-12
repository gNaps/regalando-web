import { nephilm } from "@/app/styles/fonts";
import InputFake from "@/components/inputs/input-fake.component";
import Skeleton from "@/components/skeleton.component";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-between mb-10">
        <h1 className={`text-3xl ${nephilm.className}`}>My gifts</h1>
        <div className="flex items-center gap-5">
          <UserGroupIcon className="h-7 w-7 text-white cursor-pointer" />
          <PlusCircleIcon className="h-7 w-7 text-primary cursor-pointer" />
        </div>
      </div>
      <InputFake
        icon={
          <MagnifyingGlassIcon className="h-8 w-8 text-gray absolute inset-y-2 inset-x-3" />
        }
        placeholder="Search gifts..."
      />
      <Skeleton height="h-20" />
      <Skeleton height="h-20" />
      <Skeleton height="h-20" />
      <Skeleton height="h-20" />
      <Skeleton height="h-20" />
    </>
  );
}
