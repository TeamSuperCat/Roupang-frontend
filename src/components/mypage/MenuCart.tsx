import { Link } from "react-router-dom";
import { styled } from "styled-components";

type Item = {
  id: number;
  memberId: number;
  productIdx: number;
  categoryName: string;
  sellerIdx: number;
  productName: string;
  productImg: string;
  description: string;
  price: number;
  amount: number;
  productStock: number;
  createdAt: string;
  optionDetail: string;
};

interface MenuCartProps {
  items: Item[];
}

const MenuCart = ({ items }: MenuCartProps) => {
  return (
    <CartContainer>
      <div>
        <div>
          <div className='cart_length_view'>
            <span>상품 0 개</span>
            <span>
              <Link to='/cart'>자세히 보기</Link>
            </span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "40%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>사진</th>
                <th>상품정보</th>
                <th>수량</th>
                <th>가격</th>
                <th>합계</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.productImg} alt='상품이미지' />
                  </td>
                  <td>{item.productName}</td>
                  <td>{item.productStock}</td>
                  <td>{item.price}</td>
                  <td>{item.price * item.productStock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CartContainer>
  );
};

export default MenuCart;

const CartContainer = styled.div`
  margin-top: 65px;
  width: 100%;
  @media (max-width: 1300px) {
    margin-top: 0;
  }
  .cart_length_view {
    width: 100%;
    font-size: 15px;
    background-color: #f6f6f6;
    border: 1px solid #d7d5d5;
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
      padding: 10px 20px;
    }
    a {
      text-decoration: none;
    }
  }
  table {
    th,
    td {
      text-align: center;
      vertical-align: middle;
    }
    th {
      padding: 10px 0;
    }
    td {
      height: 100px;
    }
  }
  position: relative;
`;
