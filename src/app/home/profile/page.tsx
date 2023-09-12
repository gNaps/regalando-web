import { nephilm } from "@/app/styles/fonts";
import UpdateProfileForm from "@/components/forms/update-profile.form";
import Avatar from "@/components/inputs/input-picture.component";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Suspense } from "react";
import LoadingProfile from "./loading";

const Profile = async () => {
  const supabase = createServerComponentClient<any>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profileData, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user!.id)
    .single();

  const profile = profileData as any;

  return (
    <>
      <Suspense fallback={<LoadingProfile />}>
        <UpdateProfileForm {...profile} />
      </Suspense>
    </>
  );
};

export default Profile;
