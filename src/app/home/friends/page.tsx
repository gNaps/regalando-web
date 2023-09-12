import FriendsList from "@/components/lists/friends.list";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Suspense } from "react";
import LoadingFriends from "./loading";

const Friends = async () => {
  const supabase = createServerComponentClient<any>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user!.id)
    .single();

  const { data: friendshipData } = await supabase
    .from("friendship")
    .select(
      `
        id,
        profile:friendship_profile_fkey (
        id, username, email, picture,
        gifts:gifts_profile_fkey (
            id, taken
        )
        )
    `
    )
    .eq("invited", profile.id);

  const friends = friendshipData as any;

  return (
    <>
      <Suspense fallback={<LoadingFriends />}>
        <FriendsList friends={friends} />
      </Suspense>
    </>
  );
};

export default Friends;
