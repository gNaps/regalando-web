import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Suspense } from "react";
import LoadingFriends from "./loading";
import FollowersList from "@/components/lists/follower.list";
import HeaderFollowers from "@/components/headers/followers.header";

const Followers = async () => {
  const supabase = createServerComponentClient<any>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user!.id)
    .single();

  const { data: followersData } = await supabase
    .from("friendship")
    .select(
      `
        id,
        invited:friendship_invited_fkey (
        id, username, email, picture
        )
    `
    )
    .eq("profile", profile.id);

  const followers = followersData as any;

  return (
    <>
      <Suspense fallback={<LoadingFriends />}>
        <HeaderFollowers profileId={profile.id} />
        <FollowersList followers={followers} profileId={profile.id} />
      </Suspense>
    </>
  );
};

export default Followers;
