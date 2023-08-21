import React from "react";
import styled from "styled-components";
import errorpage from "../assets/test/errorageimage.jpg";

const Error: React.FC = () => {
  return (
    <>
      <ErrorContainer>
        <div>
          <div style={{ fontSize: "3rem", fontWeight: "bold" }}>
            <a href="/">홈으로 바로가기</a>
          </div>
        </div>
        <ErrorImage>
          <ErrorMessage>
            <div style={{ fontSize: "6rem", fontWeight: "bold" }}>
              404{" "}
              <div style={{ fontSize: "3rem", fontWeight: "bold" }}>
                페이지를 찾을수 없다구요ㅠㅠ
              </div>
            </div>
          </ErrorMessage>
        </ErrorImage>
      </ErrorContainer>
    </>
  );
};

export default Error;

const ErrorContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poor Story", cur;
`;

const ErrorImage = styled.div`
  background-image: url(${errorpage});
  background-position: center;
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;

  object-fit: cover;
`;

const ErrorMessage = styled.div`
  margin-top: 50px;
  margin-left: 50px;
  display: inline-block;
  padding: 20px;
  border: 4px solid #e1f1f1;
  border-radius: 20px;
  text-shadow: 2px 2px 2px gray;
`;
