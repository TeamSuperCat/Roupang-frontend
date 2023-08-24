import axiosClient from "../../api/axios";
import { ChangeEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import useGetUrl from "../../hooks/useGetUrls";

interface Product {
  categoryIdx: number;
  description: string;
  descriptionImg: string | File;
  existsOption: boolean;
  options: Option[] | [];
  price: number;
  productImg: string | File;
  productName: string;
  salesEndDate: string;
  stock: number;
}

type Option = {
  [key: string]: string | undefined;
  optionDetailNames: string;
  optionTypeName: string;
};

type Category = {
  categoryIdx: number;
  categoryName: string;
};

interface MenuSellerProductsProps {
  getCartItems: () => Promise<void>;
}

const MenuSellerProducts = ({ getCartItems }: MenuSellerProductsProps) => {
  const [productImgUrls, setProductImgUrls] = useState<string[]>([]);
  const { ref: productImgRef, onChange: productImgOnChange } =
    useGetUrl(setProductImgUrls);

  const [descriptionImgUrls, setDescriptionImgUrls] = useState<string[]>([]);
  const { ref: descriptionImgRef, onChange: descriptionImgOnChange } =
    useGetUrl(setDescriptionImgUrls);

  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product>({
    categoryIdx: 0,
    productName: "",
    description: "",
    productImg: "default_profile.png",
    descriptionImg: "default_profile.png",
    price: 0,
    stock: 0,
    salesEndDate: "",
    existsOption: false,
    options: [],
  });
  const [option, setOption] = useState<Option>({} as Option);

  const addOption = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      ["options"]: [...prevProduct.options, option],
    }));
  };

  const handleInputChange = (
    event: ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    console.log(name, value);

    if (name === "optionDetailNames" || name === "optionTypeName") {
      if (name === undefined || value === undefined) return;
      setOption((prevOption) => ({ ...prevOption, [name]: value }));
      console.log(option);
    } else {
      addOption();
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
    console.log(name);
    console.log(value);
    // Blob 객체로 변환
    const blob = new Blob([file], { type: file.type });

    // 임시 URL 생성
    const tempURL = URL.createObjectURL(blob);
    console.log(tempURL);
    if (name === "productImg") {
      setProduct((prev) => ({ ...prev, productImg: tempURL }));
    } else if (name === "descriptionImg") {
      setProduct((prev) => ({ ...prev, descriptionImg: tempURL }));
    }
    console.log(file);
    // setProduct((prevProduct) => ({
    //   ...prevProduct,
    //   mainImage: file,
    // }));
  };

  // const handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     setProduct((prevProduct) => ({
  //       ...prevProduct,
  //       images: Array.from(event.target.files),
  //     }));
  //   }
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await productImgOnChange();
      await descriptionImgOnChange();
      console.log(productImgUrls);
      console.log(descriptionImgUrls);

      setProduct((prev) => ({ ...prev, productImg: productImgUrls[0] }));
      setProduct((prev) => ({
        ...prev,
        descriptionImg: descriptionImgUrls[0],
      }));
      console.log(product);

      // await setProduct((prev) => ({ ...prev, categoryIdx: s }));

      await axiosClient
        .post("/seller/products/register", product)
        .then((res) => {
          console.log(res);
          getCartItems();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      await axiosClient
        .get("/products/category")
        .then((res) => {
          console.log(res);
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
    console.log(productImgUrls, descriptionImgUrls);
    return () => {};
  }, [productImgUrls, descriptionImgUrls]);

  /**
   * file url 로 변환 후 저장
   * 이미지 미리보기 할 지 말 지
   *
   * handleInputChange
   * 셀렉트박스, 텍스트인풋, 파일인풋, 텍스트에어리어인풋,
   * 다 작동되는지 확인 <- name, target 잘 불러와지는지
   *
   * 각 input
   * name <- product 응답 값에 맞게 수정
   *
   *     "product_name": "상품명",
   *     "price": 1000,
   *     "stock": 83,
   *     "description": "상품한줄설명",
   *     "description_img": "상품설명이미지",
   *     "category_name": "카테고리",
   *     "product_img": "대표이미지URL",
   *     "sales_end_date": "2025-06-14",
   *
   *      product_name	String	물품명
   *      description	String	상세설명
   *      category_idx	Integer	물품 카테고리 번호
   *      price	Long	물품 가격
   *      stock	Integer	물품 재고
   *      product_img	String	물품 대표 이미지
   *      description_img	String	물품 상세 페이지 이미지
   *      sales_end_date	String	물품 판매 종료 날짜
   *      물품옵션(예를 들어 크기, 무게, 색상)		사용자가 입력
   *
   * 판매 종료일 인풋 있어야 함
   *
   * handleSubmit
   * onChange에 의해 product 값이 계속 변경되므로
   * product를 보내면 된다
   *
   * 상품이 등록 성공하면 getCartItems
   *
   *
   * 상품옵션 <<-- issue
   *
   *
   */

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h3>상품등록</h3>
        <FormItem>
          <label htmlFor="category">상품분류</label>
          <select
            name="categoryIdx"
            id="categoryIdx"
            // value={product.categoryIdx}
            onChange={handleInputChange}
          >
            {categories.map((category) => (
              <option key={category.categoryName} value={category.categoryIdx}>
                {category.categoryName}
              </option>
            ))}
            {/* <option value="간식">간식</option>
            <option value="사료">사료</option>
            <option value="미용용품">미용용품</option>
            <option value="패션용품">패션용품</option>
            <option value="위생용품">위생용품</option>
            <option value="식기/급수기">식기/급수기</option>
            <option value="외출용품">외출용품</option>
            <option value="장난감/훈련용품">장난감/훈련용품</option>
            <option value="하우스/안전용품">하우스/안전용품</option> */}
          </select>
        </FormItem>
        <FormItem className="width_full">
          <label htmlFor="name">상품명</label>
          <input
            type="text"
            id="name"
            name="produtcName"
            value={product.productName}
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
            accept="image/*"
            name="productImg"
            ref={productImgRef}
            onChange={handleMainImageChange}
          />
        </FormItem>
        <FormItem>
          <label htmlFor="image">상세이미지</label>
          <input
            type="file"
            accept="image/*"
            name="descriptionImg"
            ref={descriptionImgRef}
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
        <FormItem>
          <label htmlFor="sales-end-date">판매 종료일</label>
          <input
            type="date"
            id="salesEndDate"
            name="salesEndDate"
            value={product.salesEndDate}
            onChange={handleInputChange}
          />
        </FormItem>
        <FormItem>
          <label htmlFor="options">상품 옵션</label>
          <input
            type="text"
            id="optionDetailNames"
            name="optionDetailNames"
            placeholder="옵션 종류"
            value={option.optionDetailNames}
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="optionTypeName"
            name="optionTypeName"
            placeholder="옵션 값"
            value={option.optionTypeName}
            onChange={handleInputChange}
          />
          <button onClick={addOption}>옵션 추가</button>
        </FormItem>
        {/* <FormItem>
          <label htmlFor="product-options">물품 옵션</label>
          <input
            type="text"
            id="produtcOptions"
            name="produtcOptions"
            value={product.produtcOptions}
            onChange={handleInputChange}
          />
        </FormItem> */}
        <ButtonEditWarp>
          <button>등록완료</button>
        </ButtonEditWarp>
      </form>
      <ProductsLists>
        <h3>상품목록</h3>
        <table>
          <thead>
            <tr>
              {/* <th colspan="2">The table header</th> */}
              <th>No</th>
              <th>상품코드</th>
              <th>상품명</th>
              <th>판매가</th>
              <th>할인가</th>
              <th>상품수정</th>
              <th>상품삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>P000000R</td>
              <td>
                <div className="product_name">
                  <div className="product_name_img_wrap">
                    <img src="/img/thumbnail.jpg" alt="상품썸네일" />
                  </div>
                  <span>공간활용 고양이 윈도우 해먹 창틀해먹 고양이선반</span>
                </div>
              </td>
              <td>12000</td>
              <td>8000</td>
              <td>
                <button>
                  <Link to="/selleredit">수정</Link>
                </button>
              </td>
              <td>
                <button>삭제</button>
              </td>
            </tr>
          </tbody>
        </table>
      </ProductsLists>
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
    padding: 0 10px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
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
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    transition: all ease-in-out 0.2s;
    &:hover {
      color: #fff;
      background-color: #605e49;
    }
  }
`;

const ProductsLists = styled.section`
  font-size: 16px;
  table,
  th,
  td {
    border: 1px solid #838383;
    padding: 8px 4px;
  }
  table {
    width: 800px;
    border-collapse: seperate;
  }
  th {
    background-color: #eee;
    font-weight: 600;
    color: #555555;
  }
  td {
    vertical-align: middle;
    padding: 8px;
    /* color: #757575; */
    button {
      width: 100%;
      height: 34px;
      font-weight: 600;
      background-color: #fff;
      border: none;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
        rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
      border-radius: 5px;
      /* color: #757575; */
      transition: all ease-in-out 0.2s;
      &:hover {
        color: #fff;
        background-color: #757575;
      }
      a {
        text-decoration: none;
      }
    }
  }
  thead,
  tfoot {
    /* border-spacing: 200px 300px; */
    background-color: #eee;
    font-weight: 600;
  }
  .product_name {
    display: flex;
    align-items: center;
    gap: 8px;
    &_img_wrap {
      width: 44px;
      height: 44px;
      padding: 1px;
      background-color: #eee;
      img {
        width: 98%;
      }
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
