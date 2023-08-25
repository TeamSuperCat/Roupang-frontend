import { useMutation } from "@tanstack/react-query";
// import { AxiosResponse } from "axios";
import axiosClient from "../api/axios";

type UploadImageFn = (images: File[]) => Promise<string[]>;

// type CloudinaryResponse = {
//   url: string;
//   secure_url: string;
// };

const { VITE_CLOUDINARY_API_KEY, VITE_CLOUDINARY_UPLOAD_PRESET } = import.meta
  .env;

const handleImageUpload: UploadImageFn = async (files) => {
  const imageArray: FormData[] = files.map((image) => {
    const formData = new FormData();
    formData.append("api_key", VITE_CLOUDINARY_API_KEY);
    formData.append("upload_preset", VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append("file", image);
    return formData;
  });

  const uploadRequests: Promise<any>[] = imageArray.map((formData) =>
    axiosClient.post(
      `https://api.cloudinary.com/v1_1/ji/image/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
  );

  const responses = await Promise.allSettled(uploadRequests);

  const urls: string[] = responses.reduce((acc: string[], res) => {
    if (res.status === "fulfilled") {
      acc.push(res.value.secure_url);
    }
    return acc;
  }, []);
  console.log(urls);
  return urls;
};

const useImage = () => {
  const mutation = useMutation(handleImageUpload);

  return mutation;
};

export default useImage;
