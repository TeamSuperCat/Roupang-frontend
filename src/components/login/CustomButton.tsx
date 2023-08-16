import { styled } from "styled-components";

const CustomButton = () => {
  return <Button>로그인</Button>;
};

export default CustomButton;

const Button = styled.button`
  background-color: ${(props) => props.color};
  color: #222;
  font-weight: 600;
  font-size: 16px;
  border: 1px solid transparent;

  width: 460px;
  height: 50px;
  margin: 10px 0 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  position: relative;
  svg {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0, -50%);
  }
`;
