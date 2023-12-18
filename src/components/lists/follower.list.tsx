"use client";

import { FriendModel } from "@/models/friend.model";
import { useEffect, useState } from "react";
import debounce from "debounce";
import InputSearch from "../inputs/input-search.component";
import FollowerItem from "./list-item/follower.item";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface FollowersListProps {
  followers: FriendModel[];
  profileId: string;
}

const FollowersList = ({ followers, profileId }: FollowersListProps) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [followersDisplayed, setfollowersDisplayed] =
    useState<FriendModel[]>(followers);

  useEffect(() => {
    setfollowersDisplayed(followers);
  }, [followers]);

  const filterFollowers = (filter: string) => {
    if (!!filter) {
      const newFollowers = followers.filter((follower) =>
        follower.invited.username
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase())
      );
      setfollowersDisplayed(newFollowers);
    } else {
      setfollowersDisplayed(followers);
    }
  };

  const removeFollower = async (follower: string) => {
    const { error } = await supabase
      .from("friendship")
      .delete()
      .eq("profile", profileId)
      .eq("invited", follower);

    if (error) {
      return;
    }

    router.refresh();
  };

  return (
    <>
      <InputSearch
        name="search"
        placeholder="Search followers..."
        onChange={debounce((e: any) => filterFollowers(e.target.value), 500)}
      />

      {!!followersDisplayed &&
        !!followersDisplayed.length &&
        followersDisplayed.map((f) => (
          <FollowerItem
            key={f.id}
            removeFollower={removeFollower}
            {...f.invited}
          />
        ))}

      {!followersDisplayed ||
        (!followersDisplayed.length && (
          <p className="text-center">
            No result found. It looks like you have not invited anyone to your
            list.
          </p>
        ))}
    </>
  );
};

export default FollowersList;
