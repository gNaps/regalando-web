"use client";

import { useState } from "react";
import Button from "../button.component";
import { useForm } from "react-hook-form";
import InputText from "../inputs/input-text.component";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Avatar from "../inputs/input-picture.component";
import InputDate from "../inputs/input-date.component";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface CompleteProfileProps {
  userId: string;
}

const CompleteProfileForm = ({ userId }: CompleteProfileProps) => {
  const supabase = createClientComponentClient();
  const [index, setIndex] = useState(0);
  const [data, setData] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const router = useRouter();

  const onNextStep = async ({ username, picture, birth }: any) => {
    if (index < 2) {
      setIndex(index + 1);
    } else {
      const fileExt = picture.name.split(".").pop();
      const filePath = `${userId}-${Math.random()}.${fileExt}`;

      let { error: uploadError } = await supabase.storage
        .from("pictures")
        .upload(filePath, picture, {
          cacheControl: "3600",
          upsert: false,
        });

      if (!!uploadError) {
        console.error("uploadError", uploadError);
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({ username, birth, picture: filePath, isComplete: true })
        .eq("id", userId);

      router.push("/");
    }
  };

  return (
    <>
      <div className="flex gap-4 pt-10">
        <div
          className={`w-1/3 h-1 ${index === 0 ? "bg-primary" : "bg-white"}`}
        ></div>
        <div
          className={`w-1/3 h-1 ${index === 1 ? "bg-primary" : "bg-white"}`}
        ></div>
        <div
          className={`w-1/3 h-1 ${index === 2 ? "bg-primary" : "bg-white"}`}
        ></div>
      </div>
      {index === 0 && (
        <span className="my-10">
          <h1 className="text-2xl">Choose a username</h1>
          <p className="text-sm">
            It will not be possible to change it in the future
          </p>
        </span>
      )}
      {index === 1 && (
        <span className="my-10">
          <h1 className="text-2xl">Choose your photo profile</h1>
        </span>
      )}
      {index === 2 && (
        <span className="my-10">
          <h1 className="text-2xl">Select your birthday</h1>
        </span>
      )}

      <form
        onSubmit={handleSubmit((data) => onNextStep(data))}
        className="flex flex-col w-full flex-1"
      >
        {index === 0 && (
          <InputText
            type="text"
            name="username"
            icon={
              <UserCircleIcon className="h-8 w-8 text-gray absolute inset-y-2 inset-x-3" />
            }
            placeholder="Enter username"
            validationSchema={{
              required: "Username is required",
            }}
            register={register}
            errors={errors}
          />
        )}

        {index === 1 && (
          <Avatar
            onUpload={(url) => {
              setValue("picture", url);
            }}
          />
        )}

        {index === 2 && (
          <InputDate
            name="birth"
            icon={
              <UserCircleIcon className="h-8 w-8 text-gray absolute inset-y-2 inset-x-3" />
            }
            placeholder="DD/MM/YYYY"
            validationSchema={{
              required: "Birthday is required",
            }}
            register={register}
            errors={errors}
          />
        )}

        <span className="mt-auto">
          <Button type="submit" value="Next" theme="primary"></Button>
        </span>
      </form>
    </>
  );
};

export default CompleteProfileForm;
