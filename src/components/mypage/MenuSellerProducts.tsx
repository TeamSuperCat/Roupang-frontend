import { styled } from "styled-components";
import SellerProductsList from "./SellerProductsList";
import SellerRegisterProduct from "./SellerRegisterProduct";
import axiosClient from "../../api/axios";
import { useEffect, useState } from "react";

interface Product {
  description: string;
  price: number;
  product_img: string;
  product_name: string;
}

const MenuSellerProducts = () => {
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const getSellerProducts = async (page = 0) => {
    await axiosClient
      .get(`/seller/products?page=${page}&size=5&order=`)
      .then((res) => {
        console.log(res);
        const newData = [...res.data.content];
        setSellerProducts((prevSellerProducts) => [...prevSellerProducts, ...newData]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSellerProducts(page);
    return () => {};
  }, [page]);

  return (
    <Container>
      <SellerRegisterProduct getSellerProducts={getSellerProducts} />
      <SellerProductsList sellerProducts={sellerProducts} page={page} setPage={setPage} />
    </Container>
  );
};

export default MenuSellerProducts;

const Container = styled.div`
  width: 800px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: flex-start;
  margin: 0 auto;
  form {
    width: 100%;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    padding-bottom: 20px;
  }
`;
