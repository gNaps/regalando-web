"use client";

import { nephilm } from "@/app/styles/fonts";
import { Dialog, Transition } from "@headlessui/react";
import { ChevronLeftIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import Button from "../button.component";
import { useForm } from "react-hook-form";
import InputText from "../inputs/input-text.component";

interface IHeaderFollowersProps {
  profileId: string;
}

const HeaderFollowers = ({ profileId }: IHeaderFollowersProps) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ username }: any) => {
    const { data: toInvite, error: errorProfile } = await supabase
      .from("profiles")
      .select()
      .eq("username", username)
      .single();

    if (errorProfile) {
      return;
    }

    const { error: errorFriendship } = await supabase
      .from("friendship")
      .insert({ profile: profileId, invited: toInvite.id });

    if (errorFriendship) {
      return;
    }

    router.refresh();
    setIsOpen(false);
    reset();
  };

  return (
    <div className="flex items-center gap-3 mb-10">
      <ChevronLeftIcon
        className="h-6 w-6 cursor-pointer"
        onClick={() => router.push("/home/user")}
      />
      <h1 className={`text-3xl ${nephilm.className}`}>Followers</h1>
      <div className="flex items-center gap-5 ms-auto">
        <PlusCircleIcon
          className="h-7 w-7 text-primary cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl text-left bg-middle-gray p-6 shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 mb-5"
                  >
                    Add new user to your list
                  </Dialog.Title>
                  <form
                    className="mt-2"
                    onSubmit={handleSubmit((data) => onSubmit(data))}
                  >
                    <p className="text-sm text-gray-500 mb-4">Enter username</p>

                    <InputText
                      type="text"
                      name="username"
                      placeholder="Enter username..."
                      validationSchema={{
                        required: "Username is required",
                      }}
                      register={register}
                      errors={errors}
                    />
                    <div className="mt-4 flex gap-3">
                      <Button
                        theme="secondary"
                        onClick={closeModal}
                        value="Cancel"
                      />
                      <Button theme="primary" type="submit" value="Add user" />
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default HeaderFollowers;
