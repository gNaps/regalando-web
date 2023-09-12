import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient<any>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user!.id);

  const profile = profiles![0]

  if(!profile.isComplete) {
    redirect('/auth/complete-profile')
  } else {
    redirect('/home/friends')
  }
}
