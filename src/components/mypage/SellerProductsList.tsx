import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

interface SellerProductsListProps {
  sellerProducts: Product[];
  page: number;
  setPage: (page: number) => void;
}

interface Product {
  description: string;
  price: number;
  product_img: string;
  product_name: string;
}

const SellerProductsList = ({ sellerProducts, page, setPage }: SellerProductsListProps) => {
  const discountRate = 0.01;
  const getProductsHandler = (e: SyntheticEvent) => {
    console.log(e);
    setPage(page + 1);
  };
  return (
    <div>
      <ProductsLists>
        <ProductsListHeader>
          <h3>상품목록</h3>
          <h2 onClickCapture={getProductsHandler}>상품 목록 불러오기</h2>
        </ProductsListHeader>
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
            {sellerProducts.map((product, index) => (
              <>
                <tr key={product.product_name}>
                  <td>No.{index + 1}</td>
                  <td>P000000R</td>
                  <td>
                    <div className='product_name'>
                      <div className='product_name_img_wrap'>
                        <img src={product.product_img} alt={product.product_name} />
                      </div>
                      <span>{product.product_name}</span>
                    </div>
                  </td>
                  <td>{product.price}</td>
                  <td>{product.price * (1 - discountRate)}</td>
                  <td>
                    <button>
                      <Link to='/selleredit'>수정</Link>
                    </button>
                  </td>
                  <td>
                    <button>삭제</button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </ProductsLists>
    </div>
  );
};

export default SellerProductsList;

const ProductsListHeader = styled.div`
  display: flex;
  justify-content: space-between;
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
      box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
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
