import { styled } from "styled-components";
import { BsGithub, BsYoutube } from "react-icons/bs";
import { SiNotion } from "react-icons/si";

function Footer() {
  return (
    <FooterWrap>
      <FooterEl>
        <div>
          <img src="/img/roupang.svg" alt="" />
        </div>
        <LogoWrap>
          <a href="https://github.com/TeamSuperCat" target="_blank">
            <BsGithub />
          </a>
          <a
            href="https://www.notion.so/Team-Suer-Cat-819e1a14b6a847299bb6866eaff22032?pvs=4"
            target="_blank"
          >
            <SiNotion />
          </a>
          <a>
            <BsYoutube />
          </a>
        </LogoWrap>
      </FooterEl>
    </FooterWrap>
  );
}

export default Footer;
const FooterWrap = styled.footer`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(128, 128, 128, 0.3);
  margin-top: 50px;
`;
const FooterEl = styled.div`
  width: 1210px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1300px) {
    max-width: 1000px;
  }
  @media (max-width: 1150px) {
    max-width: 840px;
  }
  @media (max-width: 950px) {
    max-width: 90%;
  }
  @media (max-width: 550px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }

  & > div > img {
    filter: invert(500%) sepia(500%) saturate(0%) hue-rotate(0deg)
      brightness(500%) contrast(500%);
    cursor: pointer;
    width: 150px;
    @media (max-width: 550px) {
      width: 120px;
    }
    &:hover {
      filter: invert(500%) sepia(500%) saturate(0%) hue-rotate(0deg)
        brightness(100%) contrast(0%);
    }
  }
`;

const LogoWrap = styled.div`
  display: flex;
  color: white;
  width: 150px;
  @media (max-width: 550px) {
    width: 120px;
    gap: 25%;
    justify-content: center;
  }

  & > a {
    font-size: 30px;
    margin-right: 20px;
    transition: all ease-in-out 0.2s;
    @media (max-width: 550px) {
      font-size: 22px;
      margin: 0;
      animation: wave 0.9s ease-in-out infinite;

      @keyframes wave {
        0%,
        100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      &:nth-child(0) {
        animation-delay: 0s;
      }
      &:nth-child(1) {
        animation-delay: 0.2s;
      }
      &:nth-child(2) {
        animation-delay: 0.4s;
      }
      &:nth-child(3) {
        animation-delay: 0.6s;
      }
    }
    &:hover {
      color: rgba(128, 128, 128, 0.4);
    }
  }
`;
