"use client";
import { nephilm } from "@/app/styles/fonts";
import InputText from "../inputs/input-text.component";
import { LockClosedIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../button.component";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Welcome from "../welcome.component";
import Image from "next/image";

export default function SignInForm() {
  const supabase = createClientComponentClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [data, setData] = useState("");

  const onSubmit = async ({email, password}: any) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    window.location.reload();
    reset();
  };

  const onLoginGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_CALLBACK_URL
      }
    })
  };

  return (
    <>
      <Image src="splash_logo.svg" width={200} alt="logo" />
      <span className="my-10 text-center">
        <h1 className={`text-3xl ${nephilm.className}`}>Welcome back!</h1>
        <p className="">Use credentials to access your account</p>
      </span>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col w-full"
      >
        <InputText
          type="email"
          name="email"
          icon={
            <UserCircleIcon className="h-8 w-8 text-gray absolute inset-y-2 inset-x-3" />
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
        <Link href={"/recovery-password"}>
          <p className="text-right text-sm mb-8 font-light">Forgot password?</p>
        </Link>
        <Button type="submit" value="Login" theme="primary"></Button>
      </form>
      <div className="flex gap-3 my-8 w-full justify-center items-center">
        <hr className="h-px border-t border-gray flex-1" />
        <p>Or</p>
        <hr className="h-px border-t border-gray flex-1" />
      </div>
      <Button
        value="Login with Google"
        theme="secondary"
        onClick={() => onLoginGoogle()}
      />
      <Link href={'/sign-up'}>
        <p className="text-center mt-10">
          Do not have an account?
          <span className="font-bold text-primary">Sign up</span>
        </p>
      </Link>
    </>
  );
}
