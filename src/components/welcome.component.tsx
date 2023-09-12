"use client";

import { useState } from "react";
import { nephilm } from "@/app/styles/fonts";
import Button from "./button.component";
import Image from "next/image";

const Welcome = () => {
  const [index, setIndex] = useState(0);

  const onNextStep = () => {
    if (index <= 3) {
      setIndex(index + 1);
    } else {
      localStorage.setItem("REGALANDO_FIRST_SIGN_IN", "true");
      window.location.reload();
    }
  };

  return (
    <>
      <Image src="welcome-1.svg" alt="welcome" />
      <span className="my-10 text-center">
        <h1 className={`text-3xl ${nephilm.className} mb-10`}>
          Farewell undesirable gifts
        </h1>
        <p>
          Create giftlist, share it with friends, and receive the gifts you
          really want
        </p>
      </span>
      <div className="flex gap-4 flex-1">
        <div className="rounded-full w-5 h-5 bg-white"></div>
        <div className="rounded-full w-5 h-5 bg-white"></div>
        <div className="rounded-full w-5 h-5 bg-white"></div>
      </div>
      <Button
        value="Next"
        theme="primary"
        onClick={() => onNextStep()}
      />
    </>
  );
};

export default Welcome;
