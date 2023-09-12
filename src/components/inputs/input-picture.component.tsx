"use client";
import React from "react";
import usePicture from "@/hooks/usePicture";
import { PhotoIcon } from "@heroicons/react/24/outline";
import ProfilePicture from "../profile-picture.component";
import { useSupabaseUrlImage } from "@/hooks/useSupabaseUrlmage";

interface AvatarProps {
  currentUrl?: string;
  onUpload: (url: string) => void;
}

export default function Avatar({ onUpload, currentUrl }: AvatarProps) {
  const [image, setImage] = React.useState("");
  const [currentPicture, setCurrentPicture] = React.useState<string | null>(
    currentUrl || null
  );
  const imageRef = React.useRef(null);
  const inputFileRef: any = React.useRef(null);
  const { result, uploader } = usePicture();
  const currentPictureUrl = useSupabaseUrlImage(currentPicture || '')

  return (
    <>
      <input
        className="hidden"
        ref={inputFileRef}
        type="file"
        onChange={(e: any) => {
          setCurrentPicture(null);
          setImage(e.target.files[0]);
          uploader(e);
          onUpload(e.target.files[0]);
        }}
      />
      {currentPicture && (
        <>
          <div
            className="cursor-pointer flex mx-auto"
            onClick={() => inputFileRef.current.click()}
          >
            <ProfilePicture
              url={currentPictureUrl}
              size="large"
              shape="circle"
            />
          </div>
        </>
      )}
      {!currentPicture && !result && (
        <div
          className="button flex justify-center"
          onClick={() => inputFileRef.current.click()}
        >
          <div className="h-32 w-32 rounded-full border border-gray px-3 py-3">
            <PhotoIcon className="text-gray" />
          </div>
        </div>
      )}
      {!currentPicture && result && (
        <div
          className="button flex justify-center"
          onClick={() => inputFileRef.current.click()}
        >
          <div
            className="h-32 w-32 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${result}` }}
          >
            {/* <img ref={imageRef} src={result} alt="" /> */}
          </div>
        </div>
      )}
    </>
  );
}
