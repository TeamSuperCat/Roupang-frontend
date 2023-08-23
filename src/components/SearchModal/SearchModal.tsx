import React, { useState } from "react";
import { SearchModalWrapper } from "./stSearchModal";
import { getSearchItems, getKeyword, getSortType } from "../../slice/ItemSlice";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/useDispatch";

interface SearchModalProps {
  setShowModal: (show: boolean) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ setShowModal }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
  };

  const handlecloseModal = () => {
    setShowModal(false);
  };

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(getSearchItems({ keyword: inputValue }));
      dispatch(getKeyword(inputValue));
      dispatch(getSortType(""));
      setShowModal(false);
      navigate("/main");
    }
  };

  return (
    <SearchModalWrapper onClick={handlecloseModal}>
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
          <img src="/img/whitesearch.svg" alt="search" />
        </div>
        <div className="search_input_recent">{/* map */}</div>
      </div>
    </SearchModalWrapper>
  );
};

export default SearchModal;
