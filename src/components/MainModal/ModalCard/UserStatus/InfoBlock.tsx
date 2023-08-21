import { styled, css } from "styled-components";
import { useRouter } from "../../../../hooks/useRouter";

interface IProps {
  id: number;
  name: string;
  value: number;
  path: string;
  solid?: boolean;
  unit?: string;
}

interface DivProps {
  $solid?: boolean;
}

function InfoBlock({ name, value, unit, path, solid }: IProps) {
  const { routeTo } = useRouter();

  return (
    <StatusBlock $solid={solid} onClick={() => routeTo(path)}>
      <span>{name}</span>
      <span>
        {value}
        {unit}
      </span>
    </StatusBlock>
  );
}

export default InfoBlock;

const StatusBlock = styled.div<DivProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 10px 3px 10px;
  font-size: 11px;
  font-weight: 700;
  color: rgba(51, 51, 51, 0.8);
  height: 25px;
  border-top: 1px solid rgba(68, 68, 68, 0.12);
  border-left: 1px solid rgba(68, 68, 68, 0.12);
  border-right: 1px solid rgba(68, 68, 68, 0.12);
  cursor: pointer;

  ${({ $solid }) =>
    $solid &&
    css`
      background-color: #f9f9f9;
    `}
  ${({ $solid }) =>
    !$solid &&
    css`
      &:hover {
        color: var(--primary-color);
      }
    `}

  &:nth-child(2n) {
    border-left: none;
  }

  & > span:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &:nth-last-child(1),
  &:nth-last-child(2) {
    border-bottom: 1px solid rgba(68, 68, 68, 0.12);
  }
`;
