import React, { useState } from "react";
import { SearchModalWrapper } from "./stSearchModal";
import {
  getSearchItems,
  getKeyword,
  getSortType,
  chechControl,
} from "../../slice/ItemSlice";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/useDispatch";
import Loading from "../Loading/Loading";

interface SearchModalProps {
  setShowModal: (show: boolean) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ setShowModal }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
  };

  const handlecloseModal = () => {
    setShowModal(false);
  };

  //타입가드!!!!!! 발동!!!!!!
  const isKeyboardEvent = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLImageElement, MouseEvent>
  ): e is React.KeyboardEvent<HTMLInputElement> => {
    return (e as React.KeyboardEvent<HTMLInputElement>).key !== undefined;
  };

  const handleInputEnter = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const valtrim = inputValue.trim();
    if (isKeyboardEvent(e) && e.key !== "Enter") {
      return;
    }
    if (valtrim === "") {
      alert("검색어를 입력해 주세요.");
      return;
    }
    setIsloading(true);
    dispatch(chechControl());

    dispatch(getSearchItems({ keyword: inputValue }))
      .unwrap()
      .then(() => {
        setIsloading(false);
        dispatch(getKeyword(inputValue));
        dispatch(getSortType(""));
        setShowModal(false);
        navigate("/main");
      })
      .catch(() => {
        setIsloading(false);
        alert("해당 검색어에 맞는 상품이 없습니다.");
      });
  };

  console.log(inputValue);

  return (
    <SearchModalWrapper onClick={handlecloseModal}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="searchmodal_box" onClick={(e) => e.stopPropagation()}>
          <div className="search_inputinfo">
            <label className="search_inputlabel">
              <input
                className="search_input"
                type="text"
                onKeyDown={handleInputEnter}
                onChange={handleSearchValue}
                value={inputValue}
              />
            </label>
            <img
              onClick={handleInputEnter}
              src="/img/whitesearch.svg"
              alt="search"
            />
          </div>
          <div className="search_input_recent">{/* map */}</div>
        </div>
      )}
    </SearchModalWrapper>
  );
};

export default SearchModal;
