import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  a{
    color:inherit;
  }
  font-family: "Jost", sans-serif;
`;

export default GlobalStyles;
