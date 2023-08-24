import styled from "styled-components";
import ProductCard from "../Home/ProductCard";
import { useAppSelector } from "../../hooks/useDispatch";
import Loading from "../Loading/Loading";
import { useEffect } from "react";

const MainList = () => {
  const items = useAppSelector((state) => state.item.items);
  const LoadingData = useAppSelector((state) => state.item.isLoading);

  useEffect(() => {}, []);

  return (
    <>
      {LoadingData ? (
        <Loading />
      ) : (
        <ListWrapper>
          {items.map((item, i) => (
            <ProductCard key={i} item={item} />
          ))}
        </ListWrapper>
      )}
    </>
  );
};

export default MainList;

const ListWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  grid-row-gap: 30px;
  grid-column-gap: 5px;
  margin-top: 10px;
`;
