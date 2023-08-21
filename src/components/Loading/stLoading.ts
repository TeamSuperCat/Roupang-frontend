import styled from "styled-components";

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: transparent;
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    height: 100px;
    span {
      position: relative;
      top: 20px;
      display: inline-block;
      font-family: "Fredoka", sans-serif;
      font-size: 80px;
      color: #fff;
      &:nth-child(1) {
        animation: bounce 0.3s ease infinite alternate;
        color: #521110;
        text-shadow: 0 1px 0 #854443, 0 2px 0 #854443, 0 3px 0 #854443,
          0 4px 0 #854443, 0 5px 0 #854443, 0 6px 0 transparent,
          0 7px 0 transparent, 0 8px 0 transparent, 0 9px 0 transparent,
          0 10px 10px rgba(0, 0, 0, 0.4);
      }
      &:nth-child(2) {
        animation: bounce 0.3s ease infinite alternate;
        animation-delay: 0.1s;
        color: #521110;
        text-shadow: 0 1px 0 #854443, 0 2px 0 #854443, 0 3px 0 #854443,
          0 4px 0 #854443, 0 5px 0 #854443, 0 6px 0 transparent,
          0 7px 0 transparent, 0 8px 0 transparent, 0 9px 0 transparent,
          0 10px 10px rgba(0, 0, 0, 0.4);
      }
      &:nth-child(3) {
        animation: bounce 0.3s ease infinite alternate;
        animation-delay: 0.2s;
        color: #521110;
        text-shadow: 0 1px 0 #854443, 0 2px 0 #854443, 0 3px 0 #854443,
          0 4px 0 #854443, 0 5px 0 #854443, 0 6px 0 transparent,
          0 7px 0 transparent, 0 8px 0 transparent, 0 9px 0 transparent,
          0 10px 10px rgba(0, 0, 0, 0.4);
      }
      &:nth-child(4) {
        animation: bounce2 0.3s ease infinite alternate;
        animation-delay: 0.3s;
        color: #d73227;
        text-shadow: 0 1px 0 #ff655a, 0 2px 0 #ff655a, 0 3px 0 #ff655a,
          0 4px 0 #ff655a, 0 5px 0 #ff655a, 0 6px 0 transparent,
          0 7px 0 transparent, 0 8px 0 transparent, 0 9px 0 transparent,
          0 10px 10px rgba(0, 0, 0, 0.4);
      }
      &:nth-child(5) {
        animation: bounce3 0.3s ease infinite alternate;
        animation-delay: 0.4s;
        color: #e99923;
        text-shadow: 0 1px 0 #ffcc56, 0 2px 0 #ffcc56, 0 3px 0 #ffcc56,
          0 4px 0 #ffcc56, 0 5px 0 #ffcc56, 0 6px 0 transparent,
          0 7px 0 transparent, 0 8px 0 transparent, 0 9px 0 transparent,
          0 10px 10px rgba(0, 0, 0, 0.4);
      }
      &:nth-child(6) {
        animation: bounce4 0.3s ease infinite alternate;
        animation-delay: 0.5s;
        color: #98be49;
        text-shadow: 0 1px 0 #cbf17c, 0 2px 0 #cbf17c, 0 3px 0 #cbf17c,
          0 4px 0 #cbf17c, 0 5px 0 #cbf17c, 0 6px 0 transparent,
          0 7px 0 transparent, 0 8px 0 transparent, 0 9px 0 transparent,
          0 10px 10px rgba(0, 0, 0, 0.4);
      }
      &:nth-child(7) {
        animation: bounce5 0.3s ease infinite alternate;
        animation-delay: 0.6s;
        color: #50a3d9;
        text-shadow: 0 1px 0 #83d6ff, 0 2px 0 #83d6ff, 0 3px 0 #83d6ff,
          0 4px 0 #83d6ff, 0 5px 0 #83d6ff, 0 6px 0 transparent,
          0 7px 0 transparent, 0 8px 0 transparent, 0 9px 0 transparent,
          0 10px 10px rgba(0, 0, 0, 0.4);
      }
    }
  }
  @keyframes bounce {
    100% {
      top: -20px;
      text-shadow: 0 1px 0 #854443, 0 2px 0 #854443, 0 3px 0 #854443,
        0 4px 0 #854443, 0 5px 0 #854443, 0 6px 0 #854443, 0 7px 0 #854443,
        0 8px 0 #854443, 0 9px 0 #854443, 0 50px 25px rgba(0, 0, 0, 0.4);
    }
  }
  @keyframes bounce2 {
    100% {
      top: -20px;
      text-shadow: 0 1px 0 #ff655a, 0 2px 0 #ff655a, 0 3px 0 #ff655a,
        0 4px 0 #ff655a, 0 5px 0 #ff655a, 0 6px 0 #ff655a, 0 7px 0 #ff655a,
        0 8px 0 #ff655a, 0 9px 0 #ff655a, 0 50px 25px rgba(0, 0, 0, 0.4);
    }
  }
  @keyframes bounce3 {
    100% {
      top: -20px;
      text-shadow: 0 1px 0 #ffcc56, 0 2px 0 #ffcc56, 0 3px 0 #ffcc56,
        0 4px 0 #ffcc56, 0 5px 0 #ffcc56, 0 6px 0 #ffcc56, 0 7px 0 #ffcc56,
        0 8px 0 #ffcc56, 0 9px 0 #ffcc56, 0 50px 25px rgba(0, 0, 0, 0.4);
    }
  }
  @keyframes bounce4 {
    100% {
      top: -20px;
      text-shadow: 0 1px 0 #cbf17c, 0 2px 0 #cbf17c, 0 3px 0 #cbf17c,
        0 4px 0 #cbf17c, 0 5px 0 #cbf17c, 0 6px 0 #cbf17c, 0 7px 0 #cbf17c,
        0 8px 0 #cbf17c, 0 9px 0 #cbf17c, 0 50px 25px rgba(0, 0, 0, 0.4);
    }
  }
  @keyframes bounce5 {
    100% {
      top: -20px;
      text-shadow: 0 1px 0 #83d6ff, 0 2px 0 #83d6ff, 0 3px 0 #83d6ff,
        0 4px 0 #83d6ff, 0 5px 0 #83d6ff, 0 6px 0 #83d6ff, 0 7px 0 #83d6ff,
        0 8px 0 #83d6ff, 0 9px 0 #83d6ff, 0 50px 25px rgba(0, 0, 0, 0.4);
    }
  }
`;
