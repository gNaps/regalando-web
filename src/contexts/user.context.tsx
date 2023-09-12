import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";

export interface Profile {
  id: string;
  email: string;
  picture: string;
  birth: string;
}

type UserContextData = {
  user: string;
  profile: Profile | null;
  setProfile: (value: any) => any;
  setUser: (value: any) => any;
};

const UserContext = createContext<UserContextData>({
  user: "",
  profile: null,
  setProfile: (value: any) => null,
  setUser: (value: any) => null,
});
export default UserContext;

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: supabaseUser } = await supabase.auth.getUser();
      if (!!supabaseUser && !!supabaseUser.user) {
        if (!profile) {
          const { data: profiles, error } = await supabase
            .from("profiles")
            .select()
            .eq("id", supabaseUser.user.id);

          if (!!profiles && !!profiles.length) {
            console.log("set profile");
            setProfile(profiles[0]);
          }
        }
      }
    };
    fetchProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        setProfile,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useProfile = () => {
  const { profile } = useContext(UserContext);

  return profile;
};
