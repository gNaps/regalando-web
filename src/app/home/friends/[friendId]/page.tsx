import HeaderFriendGifts from "@/components/headers/friend-gitfs.header";
import FriendGiftsList from "@/components/lists/friends-gift.list";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Suspense } from "react";
import LoadingFriendDetail from "./loading";
import { useSupabaseUrlImage } from "@/hooks/useSupabaseUrlmage";

const FriendDetail = async ({ params }: { params: { friendId: string } }) => {
  const supabase = createServerComponentClient<any>({ cookies });

  const { data: giftsData, error } = await supabase
    .from("profiles")
    .select(
      `
      id, username, email, picture,
      gifts:gifts_profile_fkey (
          id, taken, created_at, name, description, price, category
      )
  `
    )
    .eq("id", params.friendId)
    .single();

  const gifts = giftsData as any;
  const pictureUrl = useSupabaseUrlImage(gifts.picture);

  return (
    <>
      <Suspense fallback={<LoadingFriendDetail />}>
        <HeaderFriendGifts username={gifts.username} picture={pictureUrl} />
        <FriendGiftsList gifts={gifts.gifts} userId={gifts.id} />
      </Suspense>
    </>
  );
};

export default FriendDetail;
