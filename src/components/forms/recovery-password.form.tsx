"use client";
import { nephilm } from "@/app/styles/fonts";
import { createClient } from "@supabase/supabase-js";
import InputText from "../inputs/input-text.component";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../button.component";

export default function RecoveryPasswordForm() {
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

  const onSubmit = async ({ email }: any) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: process.env.NEXT_PUBLIC_UPDATE_PASSWORD_URL,
    });
    reset();
  };

  return (
    <>
      <span className="my-10 text-center">
        <h1 className={`text-3xl ${nephilm.className}`}>
          Forgot your password?
        </h1>
        <p className="">
          No problem! Enter your email below and we will send you a link to
          reset your password.
        </p>
      </span>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col w-full"
      >
        <InputText
          type="email"
          name="email"
          icon={
            <EnvelopeIcon className="h-8 w-8 text-gray absolute inset-y-2 inset-x-3" />
          }
          placeholder="Enter email"
          validationSchema={{
            required: "Email is required",
          }}
          register={register}
          errors={errors}
        />
        <Button type="submit" value="Send link" theme="primary"></Button>
      </form>
    </>
  );
}
