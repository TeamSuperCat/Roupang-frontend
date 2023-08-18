import { useDispatch, useSelector } from "react-redux";
import { toggleState, toggleOpen } from "../slice/tmpSlice";
import { useCallback } from "react";

const useToggleModal = () => {
  const state = useSelector(toggleState);
  const dispatch = useDispatch();

  const toggleModal = useCallback(() => {
    dispatch(toggleOpen());
  }, []);

  return { isOpen: state, toggleModal };
};

export default useToggleModal;
