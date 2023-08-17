import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  
  @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  body{
    font-family: "Jost", sans-serif;
  }
  a{
    color:inherit;
  }

  ${css`
    :root {
      --primary-color: #31caae;
      --primary-up-color: #31caae;
      --primary-down-color: #218574;
    }
  `}

  `;

export default GlobalStyles;
