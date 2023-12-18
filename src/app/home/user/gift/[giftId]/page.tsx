import GiftDetail from "@/components/gift-detail.component";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Loading from "./loading";

interface MyGiftProps {
  giftId: number;
}

const MyGift = async ({ params }: { params: MyGiftProps }) => {
  const supabase = createServerComponentClient<any>({ cookies });

  const { data: giftData, error } = await supabase
    .from("gifts")
    .select("*")
    .eq("id", params.giftId)
    .single();

  const gift = giftData as any;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <GiftDetail {...gift} canUpdate={true} />
      </Suspense>
    </>
  );
};

export default MyGift;
