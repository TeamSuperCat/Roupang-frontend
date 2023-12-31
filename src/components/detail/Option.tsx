import React, { useState, useEffect } from "react";
import styled from "styled-components";
interface OptionType {
  optionTypeName: string;
  optionDetails: Array<{ optionDetailName: string }>;
}

interface OptionProps {
  option: OptionType;
  finalSelectionOptions: (data: string | null, type: string | null) => void;
}

const Option = ({ option, finalSelectionOptions }: OptionProps) => {
  const [isOptionCheck, setIsOptionCheck] = useState<string | null>(
    option.optionTypeName
  );
  const [isClick, setIsClick] = useState(false);
  const [selectOptionData, setSelectOptionData] = useState<string | null>("");

  const optionCheckHandler = (event: React.MouseEvent<HTMLElement>) => {
    let optionvalue = event.currentTarget.textContent;
    setSelectOptionData(optionvalue);
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
