import { setData, storageState } from "../slice/storageSlice";
import { useAppDispatch, useAppSelector } from "./useDispatch";

const useStorage = () => {
  const state: number[] = useAppSelector(storageState);
  const dispatch = useAppDispatch();

  const updateData = (id: number[]) => {
    dispatch(setData(id));
  };

  return {
    state,
    updateData,
  };
};

export default useStorage;
