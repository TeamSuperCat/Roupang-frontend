import React, { useRef } from "react";
import useImage from "./useImage";

type urlProps = React.Dispatch<React.SetStateAction<string[]>>;

const useGetUrl = (urlState: urlProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const imageMutation = useImage();
  const { isLoading, isError, error } = imageMutation;

  const handleImageUpload = async (): Promise<string | void> => {
    if (!inputRef.current || !inputRef.current.files) return;
    const images = [...inputRef.current.files];
    const urls = await imageMutation.mutateAsync(images);
    urlState(urls);

    return isError ? "fail" : "done";
  };

  return {
    ref: inputRef,
    onChange: handleImageUpload,
    isLoading,
    isError,
    error,
  };
};

export default useGetUrl;
