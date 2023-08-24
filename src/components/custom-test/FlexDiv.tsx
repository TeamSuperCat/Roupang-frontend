import React, { ReactNode, createContext } from "react";
import { styled } from "styled-components";

const FlexDiv = ({ children }: { children: React.ReactNode }) => {
  const Context = createContext<ReactNode>(null);
  return (
    <Context.Provider value=''>
      <FlexStyleDiv>{children}</FlexStyleDiv>
    </Context.Provider>
  );
};

export default FlexDiv;

const FlexStyleDiv = styled.div`
  display: "flex";
`;

// // rsc
// import React from 'react';

// const FlexDiv = () => {
//     return (
//         <div>

//         </div>
//     );
// };

// export default FlexDiv;

// // rscm
// import React, { memo } from 'react';

// const FlexDiv = memo(() => {
//     return (
//         <div>

//         </div>
//     );
// });

// export default FlexDiv;

// // rscp
// import React from 'react';
// import PropTypes from 'prop-types';

// const FlexDiv = props => {
//     return (
//         <div>

//         </div>
//     );
// };

// FlexDiv.propTypes = {

// };

// export default FlexDiv;

// // rscpm
// import React, { memo } from 'react';
// import PropTypes from 'prop-types';

// const FlexDiv = memo((props) => {
//     return (
//         <div>

//         </div>
//     );
// });

// FlexDiv.propTypes = {

// };

// export default FlexDiv;

// // rsf
// import React from 'react';

// function FlexDiv(props) {
//     return (
//         <div>

//         </div>
//     );
// }

// export default FlexDiv;

// // rsfp
// import React from 'react';
// import PropTypes from 'prop-types';

// FlexDiv.propTypes = {

// };

// function FlexDiv(props) {
//     return (
//         <div>

//         </div>
//     );
// }

// export default FlexDiv;

// // rsi
// import React from 'react';

// const FlexDiv = (props) => (

//     );

// export default FlexDiv;
