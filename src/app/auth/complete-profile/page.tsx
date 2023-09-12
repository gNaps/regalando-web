import CompleteProfileForm from "@/components/forms/complete-profile.form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const CompleteProfile = async () => {
  const supabase = createServerComponentClient<any>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <CompleteProfileForm userId={user!.id} />
    </>
  );
};

export default CompleteProfile;
