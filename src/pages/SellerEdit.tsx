import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

interface Product {
  category: string;
  name: string;
  description: string;
  mainImage: File | null;
  images: File[] | null;
  price: number;
  stock: number;
}

const SellerEdit = () => {
  const [product, setProduct] = useState<Product>({
    category: "",
    name: "",
    description: "",
    mainImage: null,
    images: null,
    price: 0,
    stock: 0,
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleMainImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("뭐가 찍히나 보자 이벤트이미지", event.target.files[0]);
    if (event.target.files && event.target.files.length > 0) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        mainImage: event.target.files[0],
      }));
    }
  };

  const handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: Array.from(event.target.files),
      }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("category", product.category);
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("stock", product.stock.toString());
    if (product.mainImage) {
      formData.append("mainImage", product.mainImage);
    }
    if (product.images) {
      product.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    try {
      const response = await axios.patch(
        "http://localhost:8080/seller/products/{product_id}",
        formData,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h3>상품등록</h3>
        <FormItem>
          <label htmlFor="category">상품분류</label>
          <select
            name="category"
            id="category"
            value={product.category}
            onChange={handleInputChange}
          >
            <option value="간식">간식</option>
            <option value="사료">사료</option>
            <option value="미용용품">미용용품</option>
            <option value="패션용품">패션용품</option>
            <option value="위생용품">위생용품</option>
            <option value="식기/급수기">식기/급수기</option>
            <option value="외출용품">외출용품</option>
            <option value="장난감/훈련용품">장난감/훈련용품</option>
            <option value="하우스/안전용품">하우스/안전용품</option>
          </select>
        </FormItem>
        <FormItem className="width_full">
          <label htmlFor="name">상품명</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            //   onBlur={nameInputBlurHandler}
          />
        </FormItem>
        <FormItem className="width_full">
          <label htmlFor="description">상세설명</label>
          {/* <input type="text" id="description" /> */}
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
        </FormItem>
        <FormItem>
          <label htmlFor="image">대표이미지</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleMainImageChange}
          />
        </FormItem>
        <FormItem>
          <label htmlFor="image">상세이미지</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            multiple
            onChange={handleMainImageChange}
          />
        </FormItem>
        <FormItem>
          <label htmlFor="price">판매가(원)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
        </FormItem>
        <FormItem>
          <label htmlFor="stock">재고수량</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleInputChange}
          />
        </FormItem>
        <ButtonEditWarp>
          <button type="submit">
            <Link to="/seller">수정완료</Link>
          </button>
        </ButtonEditWarp>
      </form>
    </Container>
  );
};

export default SellerEdit;

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

const FormItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 20px;
  &.width_full {
    input {
      width: 80%;
    }
  }
  textarea {
    width: 80%;
    height: 60px;
    border: none;
    resize: none;
    box-sizing: border-box;
    padding: 5px 10px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 8px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 5px;
  }
  label {
    width: 80px;
  }
  select {
    width: 200px;
    height: 30px;
    display: flex;
    justify-content: flex-end;
    border: none;
    padding: 0 5px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 8px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 5px;
    option {
      background-color: #fff;
    }
  }
  input {
    width: 200px;
    height: 30px;
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 5px;
    padding: 0 10px;
  }
  input[type="file"] {
    box-shadow: none;
    padding: 2px 0 0 0;
  }
  input[type="file"]::file-selector-button {
    margin-left: 1px;
    color: #605e49;
    background-color: #fff;
    border-radius: 5px;
    padding: 5px 10px;
    font-weight: 600;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    transition: all ease-in-out 0.2s;
    &:hover {
      color: #fff;
      background-color: #605e49;
    }
  }
`;

const ButtonEditWarp = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  button {
    font-size: 16px;
    font-weight: 600;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 8px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    height: 50px;
    width: 100px;
    border-radius: 10px;
    transition: all ease-in-out 0.2s;
    background-color: #fff;
    color: #605e49;
    &:hover {
      color: #fff;
      background-color: #605e49;
    }
    a {
      text-decoration: none;
    }
  }
`;
