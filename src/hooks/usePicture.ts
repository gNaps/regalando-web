import React from "react";

const usePicture = () => {
  const [result, setResult] = React.useState("");

  function uploader(e: any) {
    const imageFile = e.target.files[0];

    const reader = new FileReader();
    reader.addEventListener("load", (e: any) => {
      setResult(e.target.result);
    });

    reader.readAsDataURL(imageFile);
  }

  return { result, uploader };
};

export default usePicture;
