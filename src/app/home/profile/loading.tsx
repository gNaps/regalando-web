import { nephilm } from "@/app/styles/fonts";
import Button from "@/components/button.component";
import InputFake from "@/components/inputs/input-fake.component";
import Skeleton from "@/components/skeleton.component";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function LoadingProfile() {
  return (
    <>
      <div className="flex w-full justify-center">
        <Skeleton height="h-32" width="w-32" shape="circle" />
      </div>
      <Skeleton height="h-16" />
      <span className="my-2">
          <p>Your birthday</p>
        </span>
      <InputFake
        icon={
          <UserCircleIcon className="h-8 w-8 text-gray absolute inset-y-2 inset-x-3" />
        }
        placeholder="Enter your our birth"
      />
      <span className="mt-10 flex flex-col gap-6">
        <Button value="Update" theme="primary"></Button>
        <Button value="Logout" theme="secondary"></Button>
      </span>
    </>
  );
}
