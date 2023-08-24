import styled from "styled-components";

export const SearchModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
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
    max-width: 800px;
    height: 300px;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: baseline;
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
      width: 100%;
      .search_inputlabel {
        width: 90%;
        display: flex;
        justify-content: center;
        @media (max-width: 550px) {
          width: 80%;
        }
        .search_input {
          width: 100%;
          border: none;
          outline: none;
          background-color: transparent;
          border-bottom: 4px solid #fff;
          color: #fff;
          padding: 30px 50px 30px 30px;
          font-size: 30px;
          @media (max-width: 550px) {
            font-size: 20px;
            padding: 10px 35px 10px 10px;
          }
        }
      }
    }

    img {
      width: 60px;
      height: 60px;
      position: absolute;
      right: 30px;
      top: 16px;
      cursor: pointer;
      @media (max-width: 550px) {
        width: 45px;
        height: 45px;
        top: -3px;
      }
      &:hover {
        filter: invert(96%) sepia(43%) saturate(291%) hue-rotate(86deg)
          brightness(101%) contrast(93%);
      }
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
