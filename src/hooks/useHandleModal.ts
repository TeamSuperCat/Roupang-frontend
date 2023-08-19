import {
  toggleState,
  toggleOpen,
  modalOpen,
  modalClose,
} from "../slice/modalSlice";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./useDispatch";

const useHandleModal = () => {
  const state = useAppSelector(toggleState);
  const dispatch = useAppDispatch();

  const toggleModal = useCallback(() => {
    dispatch(toggleOpen());
  }, []);

  const openModal = useCallback(() => {
    if (state) return;
    dispatch(modalOpen());
  }, [state]);

  const closeModal = useCallback(() => {
    if (!state) return;
    dispatch(modalClose());
  }, [state]);

  return { isOpen: state, toggleModal, openModal, closeModal };
};

export default useHandleModal;
