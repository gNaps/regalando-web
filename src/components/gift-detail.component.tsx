"use client";

import useCurrency from "@/hooks/useCurrency";
import HeaderGiftDetail from "./headers/gift-detail.header";
import {
  BuildingStorefrontIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Button from "./button.component";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ProfileModel } from "@/models/profile.model";

interface GiftDetailProps {
  userId?: string;
  username?: string;
  canUpdate: boolean;
  name: string;
  description: string;
  price: number;
  retail_store: string;
  online_store: string;
  taken: ProfileModel;
  id: number;
  loggedUser?: string;
}

const GiftDetail = ({
  userId,
  name,
  canUpdate,
  description,
  price,
  retail_store,
  online_store,
  taken,
  username,
  id,
  loggedUser,
}: GiftDetailProps) => {
  const [isDeleteGiftOpen, setDeleteGiftIsOpen] = useState(false);
  const [isDeleteTakenOpen, setDeleteTakenIsOpen] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const takenByMe = taken && taken.id === loggedUser;

  const closeDeleteGift = () => {
    setDeleteGiftIsOpen(false);
  };
  const closeDeleteTaken = () => {
    setDeleteTakenIsOpen(false);
  };

  const deleteGift = async () => {
    await supabase.from("gifts").delete().eq("id", id);
    router.push(`/home/user/`);
  };

  const deleteTaken = async () => {
    const { error } = await supabase
      .from("gifts")
      .update({ taken: null })
      .eq("id", id);

    if (error) {
      return;
    }

    router.refresh();
  };

  const takeGift = async () => {
    const { error } = await supabase
      .from("gifts")
      .update({ taken: loggedUser })
      .eq("id", id);

    if (error) {
      return;
    }

    router.refresh();
  };

  return (
    <div className="flex flex-col flex-1">
      <HeaderGiftDetail
        name={name}
        canUpdate={canUpdate}
        friendId={userId}
        giftId={id}
      />

      {!canUpdate && taken && !takenByMe && (
        <div className="bg-primary text-black py-3 px-2 rounded-lg mb-5">
          This gift is already taken by <strong>{taken.username}</strong>
        </div>
      )}

      {!canUpdate && taken && takenByMe && (
        <div className="bg-primary text-black py-3 px-2 rounded-lg mb-5">
          You have take this gift yet.
        </div>
      )}

      <div className="mb-5">
        <h1 className="text-2xl font-semibold mb-2">What is?</h1>
        <div className="py-3 px-2 bg-middle-gray rounded-lg">
          <p>{description}</p>
        </div>
      </div>
      <div className="mb-5">
        <h1 className="text-2xl font-semibold mb-2">How much?</h1>
        <div className="py-3 px-2 bg-middle-gray rounded-lg">
          <p>{useCurrency(price)}</p>
        </div>
      </div>
      <div className="mb-5">
        <h1 className="text-2xl font-semibold mb-2">Where?</h1>
        <div className="py-3 px-2 bg-middle-gray rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <BuildingStorefrontIcon className="h-6 w-6" />
            {retail_store || "No retail store indicated"}
          </div>
          <div className="flex items-center gap-2">
            <GlobeAltIcon className="h-6 w-6" />
            {online_store ? (
              <Link
                href={online_store}
                target="_blank"
                className="font-bold text-primary"
              >
                Open link
              </Link>
            ) : (
              "No online store indicated"
            )}
          </div>
        </div>
      </div>
      {!canUpdate && !taken && (
        <div className="flex-1 flex items-end">
          <Button
            theme="primary"
            value={`Gift to ${username}`}
            onClick={takeGift}
          />
        </div>
      )}
      {canUpdate && (
        <div className="flex-1 flex items-end">
          <Button
            theme="danger"
            value={`Delete`}
            onClick={() => {
              setDeleteGiftIsOpen(true);
            }}
          />
        </div>
      )}
      {takenByMe && (
        <div className="flex-1 flex items-end">
          <Button
            theme="secondary"
            value={`I dont want gift anymore`}
            onClick={() => {
              setDeleteTakenIsOpen(true);
            }}
          />
        </div>
      )}

      <Transition appear show={isDeleteGiftOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDeleteGift}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-middle-gray p-6 shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 mb-5"
                  >
                    Warning
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-4">
                      Are you sure you want to delete this gift from your list?
                      Please, proceed with caution, as someone may have already
                      purchased it.
                    </p>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Button
                      theme="secondary"
                      onClick={closeDeleteGift}
                      value="Cancel"
                    />
                    <Button
                      theme="danger"
                      onClick={deleteGift}
                      value="Delete this gift"
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isDeleteTakenOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDeleteTaken}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-middle-gray p-6 shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 mb-5"
                  >
                    Warning
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-4">
                      Are you sure you want to change the gift? Your current
                      booking will be cancelled and the gift will become
                      available again for other users.
                    </p>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Button
                      theme="secondary"
                      onClick={closeDeleteTaken}
                      value="Cancel"
                    />
                    <Button
                      theme="primary"
                      onClick={deleteTaken}
                      value="Confirm"
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default GiftDetail;
