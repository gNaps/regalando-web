import { nephilm } from "@/app/styles/fonts";
import HeaderMyGifts from "@/components/headers/my-gifts.header";
import MyGiftsList from "@/components/lists/my-gift.list";
import { PlusCircleIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Users = async () => {
  const supabase = createServerComponentClient<any>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profileData, error } = await supabase
    .from("profiles")
    .select(
      `id, username, email, picture,
    gifts:gifts_profile_fkey (
        *
    )`
    )
    .eq("id", user!.id)
    .single();

  const profile = profileData as any;

  return (
    <>
      <HeaderMyGifts />
      <MyGiftsList gifts={profile.gifts} userId={profile.id} />
    </>
  );
};

export default Users;
