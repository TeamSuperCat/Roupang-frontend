import { useNavigate } from "react-router-dom";

export const useRouter = () => {
  const router = useNavigate();

  return {
    currentPath: window.location.pathname,
    routeTo: (path: string | number) => {
      if (typeof path === "string") {
        router(path);
      } else if (typeof path === "number") {
        router(path);
      }
    },
  };
};
