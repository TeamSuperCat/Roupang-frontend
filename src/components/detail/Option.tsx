import React, { useState, useEffect } from "react";
import styled from "styled-components";

let selectOptionData = {};

const Option = ({ option, finalSelectionOptions }) => {
  const [isOptionCheck, setIsOptionCheck] = useState(option.optionTypeName);
  const [isClick, setIsClick] = useState(false);
  const [selectOptionData, setSelectOptionData] = useState({});

  const optionCheckHandler = (event: React.MouseEvent<HTMLElement>) => {
    let optionvalue = event.currentTarget.textContent;
    let optionType = option.optionTypeName;
    setSelectOptionData({
      ...selectOptionData,
      [optionType]: optionvalue,
    });
    setIsOptionCheck(optionvalue);
    setIsClick((prev) => !prev);
  };

  const optionsOpen = () => {
    setIsClick((prev) => !prev);
  };
  useEffect(() => {
    finalSelectionOptions(selectOptionData, option.optionTypeName);
    // console.log(selectOptionData);
  }, [selectOptionData]);
  return (
    <div>
      <ProductOption onClick={optionsOpen}>
        <OptionSelect>
          <div>{isOptionCheck}</div>
          <div>▿</div>
        </OptionSelect>
      </ProductOption>
      {isClick &&
        option.optionDetails.map((data, index) => {
          return (
            <OptionList>
              <div key={index} onClick={optionCheckHandler}>
                {data.optionDetailName}
              </div>

              <div></div>
            </OptionList>
          );
        })}
    </div>
  );
};

export default Option;
const ProductOption = styled.div`
  padding: 1rem;
  border: 1px solid black;
  margin-bottom: 1rem;
`;
const OptionSelect = styled.div`
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;
const OptionList = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  margin-bottom: 0.2rem;
  padding: 0.5rem;
`;
