"use client";

import { useProfile } from "@/contexts/user.context";
import { useSupabaseUrlImage } from "@/hooks/useSupabaseUrlmage";
import { HomeIcon, GiftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ProfilePicture from "./profile-picture.component";
import { usePathname } from "next/navigation";

const Footer = () => {
  const profile = useProfile();
  const picture = useSupabaseUrlImage(profile?.picture!);
  const pathname = usePathname();

  return (
    <footer className="flex justify-between px-10 py-5 h-16 bg-black">
      <Link href={"/home/friends"}>
        <HomeIcon
          className={`h-6 w-6 ${
            pathname.startsWith("/home/friends") ? "text-primary" : ""
          }`}
        />
      </Link>
      <Link href={"/home/user"}>
        <GiftIcon
          className={`h-6 w-6 ${
            pathname.startsWith("/home/user") ? "text-primary" : ""
          }`}
        />
      </Link>
      <Link href={"/home/profile"}>
        <ProfilePicture size="small" shape="circle" url={picture} />
      </Link>
    </footer>
  );
};

export default Footer;
