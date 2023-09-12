import GiftForm from "@/components/forms/gift.form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Loading from "../loading";

interface EditGiftProps {
  giftId: number;
}

const EditGift = async ({ params }: { params: EditGiftProps }) => {
  const supabase = createServerComponentClient<any>({ cookies });

  const { data: giftData, error } = await supabase
    .from("gifts")
    .select("*")
    .eq("id", params.giftId)
    .single();

  const gift = giftData as any;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <GiftForm {...gift} />
      </Suspense>
    </>
  );
};

export default EditGift;
