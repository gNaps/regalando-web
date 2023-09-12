"use client";

import { useEffect, useState } from "react";
import Button from "../button.component";
import { useForm } from "react-hook-form";
import InputText from "../inputs/input-text.component";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Avatar from "../inputs/input-picture.component";
import InputDate from "../inputs/input-date.component";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { ProfileModel } from "@/models/profile.model";
import ProfilePicture from "../profile-picture.component";
import { useSupabaseUrlImage } from "@/hooks/useSupabaseUrlmage";
import { nephilm } from "@/app/styles/fonts";

const UpdateProfileForm = ({
  id,
  birth,
  picture,
  username,
}: Partial<ProfileModel>) => {
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      birth: new Date(birth!).toISOString().substring(0, 10),
      username: username,
      picture: picture,
    },
  });
  const router = useRouter();

  const onSaveProfile = async (data: any) => {
    let filePath;

    if (typeof data.picture !== "string") {
      console.log("elimina picture", picture);
      let { error: deleteError } = await supabase.storage
        .from("pictures")
        .remove([picture!]);

      if (!!deleteError) {
        console.error("deleteError", deleteError);
        return;
      }

      const fileExt = data.picture.name.split(".").pop();
      filePath = `${id}-${Math.random()}.${fileExt}`;

      console.log("upload file", filePath);
      let { error: uploadError } = await supabase.storage
        .from("pictures")
        .upload(filePath, data.picture, {
          cacheControl: "3600",
          upsert: false,
        });

      if (!!uploadError) {
        console.error("uploadError", uploadError);
        return;
      }
    }

    console.log("id", id);
    let { error: saveError } = await supabase
      .from("profiles")
      .update({ birth: data.birth, ...(filePath ? { picture: filePath } : {}) })
      .eq("id", id);

    if (!!saveError) {
      console.error("saveError", saveError);
      return;
    }
  };

  const logout = async () => {
    console.log("logout");
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => onSaveProfile(data))}
        className="flex flex-col w-full flex-1"
      >
        <Avatar
          onUpload={(url) => {
            setValue("picture", url);
          }}
          currentUrl={picture}
        />
        <h1 className={`text-3xl ${nephilm.className} text-center my-5`}>
          {username}
        </h1>
        <span className="my-2">
          <p>Your birthday</p>
        </span>
        <InputDate
          name="birth"
          icon={
            <UserCircleIcon className="h-8 w-8 text-gray absolute inset-y-2 inset-x-3" />
          }
          placeholder="Enter your birthday"
          validationSchema={{
            required: "Birthday is required",
          }}
          register={register as any}
          errors={errors}
        />

        <span className="mt-10 flex flex-col gap-6">
          <Button type="submit" value="Update" theme="primary"></Button>
          <Button value="Logout" theme="secondary" onClick={logout}></Button>
        </span>
      </form>
    </>
  );
};

export default UpdateProfileForm;
