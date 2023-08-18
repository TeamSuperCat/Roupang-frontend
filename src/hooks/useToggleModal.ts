import { toggleState, toggleOpen } from "../slice/tmpSlice";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./useDispatch";

const useToggleModal = () => {
  const state = useAppSelector(toggleState);
  const dispatch = useAppDispatch();

  const toggleModal = useCallback(() => {
    dispatch(toggleOpen());
  }, []);

  return { isOpen: state, toggleModal };
};

export default useToggleModal;
