"use client";

import { FriendModel } from "@/models/friend.model";
import { useState } from "react";
import FriendItem from "./list-item/friend.item";
import debounce from "debounce";
import InputSearch from "../inputs/input-search.component";
import { nephilm } from "@/app/styles/fonts";

interface FriendsListProps {
  friends: FriendModel[];
}

const FriendsList = ({ friends }: FriendsListProps) => {
  const [friendsDisplayed, setFriendsDisplayed] =
    useState<FriendModel[]>(friends);

  const filterFriends = (filter: string) => {
    if (!!filter) {
      const newFriends = friends.filter((friend) =>
        friend.profile.username
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase())
      );
      setFriendsDisplayed(newFriends);
    } else {
      setFriendsDisplayed(friends);
    }
  };

  return (
    <>
      <h1 className={`text-3xl ${nephilm.className} mb-10`}>Friends gifts</h1>
        <InputSearch
          name="search"
          placeholder="Search friends..."
          onChange={debounce((e: any) => filterFriends(e.target.value), 500)}
        />

      {!!friendsDisplayed &&
        !!friendsDisplayed.length &&
        friendsDisplayed.map((f) => <FriendItem key={f.id} {...f.profile} />)}

      {!friendsDisplayed ||
        (!friendsDisplayed.length && (
          <p className="text-center">
            No result found. It looks like you have not been invited to any gift
            lists yet. Ask your friends to invite you to their gift lists.
          </p>
        ))}
    </>
  );
};

export default FriendsList;
