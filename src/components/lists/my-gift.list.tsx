"use client";
import {useState } from "react";
import debounce from "debounce";
import InputSearch from "../inputs/input-search.component";
import { GiftModel } from "@/models/gift.model";
import GiftItem from "./list-item/gift.item";

interface MyGiftsListProps {
  gifts: GiftModel[];
  userId: string;
}

const MyGiftsList = ({ gifts, userId }: MyGiftsListProps) => {
  const [giftsDisplayed, setGiftsDisplayed] = useState<GiftModel[]>(gifts);

  const filterGifts = (filter: string) => {
    if (!!filter) {
      const newGifts = gifts.filter((gift) =>
        gift.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      );
      setGiftsDisplayed(newGifts);
    } else {
      setGiftsDisplayed(gifts);
    }
  };

  return (
    <>
      <div className="mb-1">
        <InputSearch
          name="search"
          placeholder="Search gifts..."
          onChange={debounce((e: any) => filterGifts(e.target.value), 500)}
        />
      </div>

      {!!giftsDisplayed &&
        !!giftsDisplayed.length &&
        giftsDisplayed.map((g) => <GiftItem key={g.id} {...g} />)}

      {!giftsDisplayed ||
        (!giftsDisplayed.length && (
          <p className="text-center">
            No result found. Add new gifts in your list!
          </p>
        ))}
    </>
  );
};

export default MyGiftsList;
