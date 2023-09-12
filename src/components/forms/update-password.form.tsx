"use client";
import { nephilm } from "@/app/styles/fonts";
import { createClient } from "@supabase/supabase-js";
import InputText from "../inputs/input-text.component";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../button.component";

export default function UpdatePasswordForm() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [data, setData] = useState("");

  const onSubmit = async ({ password }: any) => {
    const { data, error } = await supabase.auth.updateUser({ password })
    reset();
  };

  return (
    <>
      <span className="my-10 text-center">
        <h1 className={`text-3xl ${nephilm.className}`}>
          Enter your new password
        </h1>
        <p className="">
          Enter your new password and you'll be redirected to the home page
        </p>
      </span>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col w-full"
      >
        <InputText
          type="password"
          name="password"
          icon={
            <EnvelopeIcon className="h-8 w-8 text-gray absolute inset-y-2 inset-x-3" />
          }
          placeholder="Enter password"
          validationSchema={{
            required: "Password is required",
          }}
          register={register}
          errors={errors}
        />
        <Button type="submit" value="Confirm" theme="primary"></Button>
      </form>
    </>
  );
}
