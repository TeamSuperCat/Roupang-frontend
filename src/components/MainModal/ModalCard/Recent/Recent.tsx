import { styled } from "styled-components";
import ProductModalCard from "./ProductModalCard";
import axiosClient from "../../../../api/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Loading/Loading";
import useStorage from "../../../../hooks/useStorage";
import { useEffect } from "react";

interface DataProps {
  decription: string;
  price: number;
  productIdx: number;
  productImg: string;
  productName: string;
  stock: number;
}

const getData = async (state: number[]) => {
  const dataArr = state.map((productId: number) => {
    return {
      productHistory: productId,
    };
  });
  const data = await axiosClient.post("/view_history", dataArr);
  return data;
};

function Recent() {
  const { state: storageState } = useStorage();
  const { data, isLoading, refetch, isFetching } = useQuery(
    ["recent"],
    () => getData(storageState),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    refetch();
  }, [storageState]);

  return (
    <ProductCardUl>
      {data?.data.map((props: DataProps) => (
        <ProductModalCard key={props.productIdx} {...props} />
      ))}
      {(isLoading || isFetching) && <Loading size={40} />}
    </ProductCardUl>
  );
}

export default Recent;

const ProductCardUl = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: overlay;
`;
