import Skeleton from "@/components/skeleton.component";

export default function LoadingGiftFriend() {
  return (
    <>
      <div className="mb-10">
        <Skeleton height="h-12" />
      </div>
      <div className="mb-5">
        <h1 className="text-2xl font-semibold mb-2">What is?</h1>
        <Skeleton height="h-20"/>
      </div>
      <div className="mb-5">
        <h1 className="text-2xl font-semibold mb-2">How much?</h1>
        <Skeleton height="h-20"/>
      </div>
      <div className="mb-5">
        <h1 className="text-2xl font-semibold mb-2">Where?</h1>
        <Skeleton height="h-24"/>
      </div>
    </>
  );
}
