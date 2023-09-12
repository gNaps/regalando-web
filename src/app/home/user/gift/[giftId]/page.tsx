import GiftDetail from "@/components/gift-detail.component";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface MyGiftProps {
  giftId: string;
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

//   const { data: profileData } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("id", user!.id)
//     .single();

//   const profile = profileData as any;

  return (
    <>
      <GiftDetail
        {...gift}
        canUpdate={true}
      />
    </>
  );
};

export default MyGift;
