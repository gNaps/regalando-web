import { nephilm } from "@/app/styles/fonts";
import InputFake from "@/components/inputs/input-fake.component";
import Skeleton from "@/components/skeleton.component";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function LoadingFriends() {
  return (
    <>
      <h1 className={`text-3xl ${nephilm.className} mb-10`}>Friends gifts</h1>
      <InputFake
        icon={
          <MagnifyingGlassIcon className="h-8 w-8 text-gray absolute inset-y-2 inset-x-3" />
        }
        placeholder="Search friends..."
      />
      <Skeleton height="h-20" />
      <Skeleton height="h-20" />
      <Skeleton height="h-20" />
      <Skeleton height="h-20" />
      <Skeleton height="h-20" />
    </>
  );
}
