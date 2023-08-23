import styled from "styled-components";

export const ItemLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @keyframes ldio-fgdwa3q8luo {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .ldio-fgdwa3q8luo div {
    box-sizing: border-box !important;
  }

  .ldio-fgdwa3q8luo > div {
    position: absolute;
    width: 144px;
    height: 144px;
    top: 28px;
    left: 28px;
    border-radius: 50%;
    border: 16px solid #000;
    border-color: #31caae transparent #31caae transparent;
    animation: ldio-fgdwa3q8luo 1s linear infinite;
  }

  .ldio-fgdwa3q8luo > div:nth-child(2) {
    border-color: transparent;
  }

  .ldio-fgdwa3q8luo > div:nth-child(2) div {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
  }

  .ldio-fgdwa3q8luo > div:nth-child(2) div:before,
  .ldio-fgdwa3q8luo > div:nth-child(2) div:after {
    content: "";
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    top: -16px;
    left: 48px;
    background: #31caae;
    border-radius: 50%;
    box-shadow: 0 128px 0 0 #31caae;
  }

  .ldio-fgdwa3q8luo > div:nth-child(2) div:after {
    left: -16px;
    top: 48px;
    box-shadow: 128px 0 0 0 #31caae;
  }

  .loadingio-spinner-dual-ring-o786ssvph5j {
    width: 200px;
    height: 200px;
    display: inline-block;
    overflow: hidden;
    background: #ffffff;
  }

  .ldio-fgdwa3q8luo {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0;
    /* see note above */
  }

  .ldio-fgdwa3q8luo div {
    box-sizing: content-box;
  }
`;
