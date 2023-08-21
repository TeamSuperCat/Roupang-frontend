import { styled } from "styled-components";
import { useRouter } from "../../../../hooks/useRouter";

interface Props {
  children: React.ReactNode;
  name: string;
  path: string;
}

function CategoryBtn({ children, name, path }: Props) {
  const { routeTo } = useRouter();

  const navigation = () => {
    routeTo(path);
  };

  return (
    <CategoryLi onClick={navigation}>
      <CategoryIcon>{children}</CategoryIcon>
      <CategoryTitle>{name}</CategoryTitle>
    </CategoryLi>
  );
}

export default CategoryBtn;

const CategoryLi = styled.li`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 9fr;
  padding: 15px 20px 15px 20px;
  font-weight: 600;
  border-bottom: 1px solid rgba(68, 68, 68, 0.1);
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

const CategoryIcon = styled.span`
  font-size: 23px;
  margin-right: 20px;
`;

const CategoryTitle = styled.span`
  font-size: 13px;
  color: rgba(68, 68, 68, 0.88);
  &:hover {
    color: black;
  }
`;
