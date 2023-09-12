"use client";
import { nephilm } from "@/app/styles/fonts";
import InputText from "../inputs/input-text.component";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../button.component";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SignUpForm() {
  const supabase = createClientComponentClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [data, setData] = useState("");

  const onSubmit = async ({ email, password }: any) => {
    reset();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_CALLBACK_URL,
      },
    });
  };

  const onSignUpGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  };

  return (
    <>
      <img src="splash_logo.svg" width={200} />
      <span className="my-10 text-center">
        <h1 className={`text-3xl ${nephilm.className}`}>
          Welcome to Regalando!
        </h1>
        <p className="">Choose your credentials and enjoy</p>
      </span>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col w-full"
      >
        <InputText
          type="text"
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
        <InputText
          type="password"
          name="password"
          icon={
            <LockClosedIcon className="h-8 w-8 text-gray absolute inset-y-2 inset-x-3" />
          }
          placeholder="Enter password"
          validationSchema={{
            required: "Password is required",
          }}
          register={register}
          errors={errors}
        />
        <Button type="submit" value="Sign up" theme="primary"></Button>
      </form>
      <div className="flex gap-3 my-8 w-full justify-center items-center">
        <hr className="h-px border-t border-gray flex-1" />
        <p>Or</p>
        <hr className="h-px border-t border-gray flex-1" />
      </div>
      <Button
        value="Sign up with Google"
        theme="secondary"
        onClick={() => onSignUpGoogle()}
      />
    </>
  );
}
