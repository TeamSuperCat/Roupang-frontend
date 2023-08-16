import React from "react";
import styled from "styled-components";

interface SearchModalProps {
  setShowModal: (show: boolean) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ setShowModal }) => {
  const handlecloseModal = () => {
    setShowModal(false);
  };

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowModal(false);
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

const SearchModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 900;
  animation: fadeIn 0.7s forwards;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .searchmodal_box {
    width: 100%;
    max-width: 960px;
    height: 300px;
    z-index: 999;
    animation: fadeOn 0.8s ease-in-out;
    @keyframes fadeOn {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      80% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .search_inputinfo {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      flex-direction: column;
      .search_inputlabel {
        width: 80%;
        .search_input {
          width: 100%;
          border: none;
          outline: none;
          background-color: transparent;
          border-bottom: 4px solid #fff;
          color: #fff;
          font-size: 50px;
          padding: 30px;
        }
      }
    }

    img {
      width: 70px;
      height: 70px;
      position: absolute;
      right: 0px;
      cursor: pointer;
    }
  }
  .search_input_recent {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    color: #fff;
  }
`;
