import { nephilm } from "@/app/styles/fonts";
import HeaderFollowers from "@/components/headers/followers.header";
import InputFake from "@/components/inputs/input-fake.component";
import Skeleton from "@/components/skeleton.component";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function LoadingFriends() {
  return (
    <>
      <HeaderFollowers profileId={""} />
      <InputFake
        icon={
          <MagnifyingGlassIcon className="h-8 w-8 text-gray absolute inset-y-2 inset-x-3" />
        }
        placeholder="Search followers..."
      />
      <Skeleton height="h-20" />
      <Skeleton height="h-20" />
      <Skeleton height="h-20" />
      <Skeleton height="h-20" />
      <Skeleton height="h-20" />
    </>
  );
}
