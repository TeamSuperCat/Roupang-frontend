import { styled } from "styled-components";
import { BsGithub, BsYoutube } from "react-icons/bs";
import { SiNotion } from "react-icons/si";

function Footer() {
  return (
    <FooterEl>
      <div>
        <img src="/img/roupang.svg" alt="" />
      </div>
      <LogoWrap>
        <a href="https://github.com/TeamSuperCat" target="_blank">
          <BsGithub />
        </a>
        <a
          href="https://www.notion.so/Team-Super-Cat-819e1a14b6a847299bb6866eaff22032?pvs=4"
          target="_blank"
        >
          <SiNotion />
        </a>
        <a href="javascript:void(0);">
          <BsYoutube />
        </a>
      </LogoWrap>
    </FooterEl>
  );
}

export default Footer;

const FooterEl = styled.footer`
  height: 180px;
  background-color: rgba(128, 128, 128, 0.3);
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  & > div > img {
    filter: invert(500%) sepia(500%) saturate(0%) hue-rotate(0deg)
      brightness(500%) contrast(500%);

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
  position: absolute;
  right: 50px;

  & > a {
    font-size: 30px;
    margin-right: 20px;

    &:hover {
      color: rgba(128, 128, 128, 0.4);
    }
  }
`;
