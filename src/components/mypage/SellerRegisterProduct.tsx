import { ChangeEvent, useEffect, useState } from "react";
import { styled } from "styled-components";
import useGetUrl from "../../hooks/useGetUrls";
import axiosClient from "../../api/axios";

interface Product {
  category_idx: number;
  description: string;
  description_img: string | File;
  exists_option: boolean;
  options: Option[] | [];
  price: number;
  product_img: string | File;
  product_name: string;
  sales_end_date: string;
  stock: number;
}

type Option = {
  [key: string]: string | string[] | undefined;
  optionTypeName: string;
  optionDetailNames: string[];
};

type Category = {
  categoryIdx: number;
  categoryName: string;
};

interface SellerRegisterProductProps {
  getSellerProducts: () => void;
}

const SellerRegisterProduct = ({ getSellerProducts }: SellerRegisterProductProps) => {
  const [productImgUrls, setProductImgUrls] = useState<string[]>([]);
  const { ref: productImgRef, onChange: productImgOnChange } = useGetUrl(setProductImgUrls);

  const [descriptionImgUrls, setDescriptionImgUrls] = useState<string[]>([]);
  const { ref: descriptionImgRef, onChange: descriptionImgOnChange } = useGetUrl(setDescriptionImgUrls);

  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product>({
    category_idx: 0,
    product_name: "",
    description: "",
    product_img: "default_profile.png",
    description_img: "default_profile.png",
    price: 0,
    stock: 0,
    sales_end_date: "",
    exists_option: true,
    options: [],
  });

  const [option, setOption] = useState<Option>({
    optionTypeName: "",
    optionDetailNames: [],
  } as Option);

  const [optionDetail, setOptionDetail] = useState("");

  const handleDetailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOptionDetail(event.target.value);
  };

  const deleteOptions = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      ["options"]: [],
    }));
  };

  const addOptionDetail = () => {
    console.log(optionDetail);

    setOption((prevOption) => ({
      ...prevOption,
      ["optionDetailNames"]: [...prevOption.optionDetailNames, optionDetail],
    }));

    console.log("asd");
    console.log(option);
    setOptionDetail("");
  };

  const addOption = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      ["options"]: [...prevProduct.options, option],
    }));
    setOption((prevOption) => ({
      ...prevOption,
      ["optionDetailNames"]: [],
      ["optionTypeName"]: "",
    }));
    console.log(product);
  };

  const getUrlofImages = async () => {
    await productImgOnChange();
    await descriptionImgOnChange();
    // console.log(productImgUrls);
    // console.log(descriptionImgUrls);
  };

  useEffect(() => {
    const getCategories = async () => {
      await axiosClient
        .get("/products/category")
        .then((res) => {
          //   console.log(res);
          setCategories(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCategories();
    return () => {};
  }, []);

  useEffect(() => {
    // console.log(productImgUrls, descriptionImgUrls);
    return () => {};
  }, [productImgUrls, descriptionImgUrls]);

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    // console.log(name, value);

    if (name === "optionTypeName") {
      if (name === undefined || value === undefined) return;
      setOption((prevOption) => ({ ...prevOption, [name]: value }));
      //   console.log(option);
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleMainImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file === undefined) return;

    const { name, value } = event.target;
    // console.log(name);
    console.log(value);
    // Blob 객체로 변환
    const blob = new Blob([file], { type: file.type });

    // 임시 URL 생성
    const tempURL = URL.createObjectURL(blob);
    // console.log(tempURL);
    if (name === "productImg") {
      setProduct((prev) => ({ ...prev, productImg: tempURL }));
    } else if (name === "descriptionImg") {
      setProduct((prev) => ({ ...prev, descriptionImg: tempURL }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await getUrlofImages();

      await axiosClient
        .post("/seller/products/register", product)
        .then((res) => {
          console.log(res);
          getSellerProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>상품등록</h3>
        <FormItem>
          <label htmlFor='category'>상품분류</label>
          <select name='category_idx' id='category_idx' onChange={handleInputChange}>
            {categories.map((category) => (
              <option key={category.categoryName} value={category.categoryIdx}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </FormItem>
        <FormItem className='width_full'>
          <label htmlFor='name'>상품명</label>
          <input type='text' id='name' name='product_name' value={product.product_name} onChange={handleInputChange} />
        </FormItem>
        <FormItem className='width_full'>
          <label htmlFor='description'>상세설명</label>
          <textarea name='description' value={product.description} onChange={handleInputChange} />
        </FormItem>
        <FormItem>
          <label htmlFor='image'>대표이미지</label>
          <input type='file' accept='image/*' name='product_img' ref={productImgRef} onChange={handleMainImageChange} />
        </FormItem>
        <FormItem>
          <label htmlFor='image'>상세이미지</label>
          <input
            type='file'
            accept='image/*'
            name='description_img'
            ref={descriptionImgRef}
            multiple
            onChange={handleMainImageChange}
          />
        </FormItem>
        <FormItem>
          <label htmlFor='price'>판매가(원)</label>
          <input type='number' id='price' name='price' value={product.price} onChange={handleInputChange} />
        </FormItem>
        <FormItem>
          <label htmlFor='stock'>재고수량</label>
          <input type='number' id='stock' name='stock' value={product.stock} onChange={handleInputChange} />
        </FormItem>
        <FormItem>
          <label htmlFor='sales-end-date'>판매 종료일</label>
          <input
            type='date'
            id='sales_end_date'
            name='sales_end_date'
            value={product.sales_end_date}
            onChange={handleInputChange}
          />
        </FormItem>
        <FormItem>
          <label htmlFor='options'>상품 옵션</label>
          <input
            type='text'
            id='optionTypeName'
            name='optionTypeName'
            placeholder='옵션 값'
            value={option.optionTypeName}
            onChange={handleInputChange}
          />
          <button onClick={addOption}>옵션 추가</button>
          <button onClick={deleteOptions}>옵션 지우기</button>
        </FormItem>
        <FormItem>
          <label htmlFor='options'>옵션 내용</label>
          <input
            type='text'
            id='optionDetail'
            name='optionDetail'
            placeholder='옵션 종류'
            value={optionDetail}
            onChange={handleDetailInputChange}
          />
          <button onClick={addOptionDetail}>내용 추가</button>
          {`타입: ${option.optionTypeName}, 종류: ${option.optionDetailNames}`}
        </FormItem>

        <hr />
        {product.options.map((option) => (
          <>
            <p>{`타입: 종류`}</p>
            <p>{`${option.optionTypeName}: ${option.optionDetailNames}`}</p>
            <hr />
          </>
        ))}
        <ButtonEditWarp>
          <button>등록완료</button>
        </ButtonEditWarp>
      </form>
    </>
  );
};

export default SellerRegisterProduct;

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
    box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 8px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
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
    box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 8px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
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
    padding: 0 10px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 5px;
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
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
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
    box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 8px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    height: 50px;
    width: 100px;
    border-radius: 10px;
    transition: all ease-in-out 0.2s;
    background-color: #fff;
    /* color: #605e49; */
    &:hover {
      color: #fff;
      background-color: #605e49;
    }
    a {
      text-decoration: none;
    }
  }
`;
