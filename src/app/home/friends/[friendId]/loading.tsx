import InputFake from "@/components/inputs/input-fake.component";
import Skeleton from "@/components/skeleton.component";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function LoadingFriendDetail() {
  return (
    <>
      <div className="mb-10">
        <Skeleton height="h-12" />
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
    </>
  );
}
