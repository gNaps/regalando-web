import GiftDetail from "@/components/gift-detail.component";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Suspense } from "react";
import LoadingGiftFriend from "./loading";

interface FriendGiftProps {
  friendId: string;
  giftId: string;
}

const FriendGift = async ({ params }: { params: FriendGiftProps }) => {
  const supabase = createServerComponentClient<any>({ cookies });

  const { data: giftData, error } = await supabase
    .from("gifts")
    .select("*")
    .eq("id", params.giftId)
    .single();

  const gift = giftData as any;

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", params.friendId)
    .single();

  const profile = profileData as any;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Suspense fallback={<LoadingGiftFriend />}>
      <GiftDetail
        {...gift}
        canUpdate={false}
        username={profile.username}
        userId={profile.id}
      />
    </Suspense>
  );
};

export default FriendGift;
