"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
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
  //const [uploading, setUploading] = useState(false)

  //   useEffect(() => {
  //     async function downloadImage(path: string) {
  //       try {
  //         const { data, error } = await supabase.storage.from('profiles').download(path)
  //         if (error) {
  //           throw error
  //         }

  //         const url = URL.createObjectURL(data)
  //         setAvatarUrl(url)
  //       } catch (error) {
  //         console.log('Error downloading image: ', error)
  //       }
  //     }

  //     if (url) downloadImage(url)
  //   }, [url, supabase])

  //   const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
  //     try {
  //       //setUploading(true)

  //       if (!event.target.files || event.target.files.length === 0) {
  //         throw new Error('You must select an image to upload.')
  //       }

  //       const file = event.target.files[0]
  //       const base = URL.createObjectURL(event.target.files[0])
  //       onUpload(base)
  //       setAvatarUrl(url)
  //       //const fileExt = file.name.split('.').pop()
  //     //   const filePath = `${uid}-${Math.random()}.${fileExt}`

  //       //let { error: uploadError } = await supabase.storage.from('profiles').upload(filePath, file)

  //     //   if (uploadError) {
  //     //     throw uploadError
  //     //   }

  //     //   onUpload(filePath)
  //     } catch (error) {
  //       alert('Error uploading avatar!')
  //     } finally {
  //       //setUploading(false)
  //     }
  //   }

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
              url={useSupabaseUrlImage(currentPicture)}
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
