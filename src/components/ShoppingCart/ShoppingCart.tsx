import { ChangeEvent, useEffect } from "react";
import CartItem from "./CartItem";
import { CartWrapper } from "./StCart";
import { useCartDispatch } from "../../hooks/useCartDispatch";
import { useAppSelector } from "../../hooks/useDispatch";
import Loading from "../Loading/Loading";

const ShoppingCart = () => {
  //ShoppingCart 컴포넌트에서 쓰이는 로직들을 useCartDispatch로 따로 분리하였고, 분리된 로직들을 가져왔습니다.
  const {
    items,
    selectedItems,
    handleSelectAll,
    handleItemSelect,
    handleDelete,
    handleDeleteAll,
    handleDeleteSelected,
    plusQuantity,
    minusQuantity,
    getCartlisting,
    selectClear,
    goOrder,
    SelectgoOrder,
  } = useCartDispatch();
  const isLoading = useAppSelector((state) => state.cart.isLoading);

  //이 함수는 가격을 표시하는데 3자릿수마다 콤마를 찍어주는 함수입니다. formatCurrency(숫자) 이런식으로 사용합니다.
  function formatCurrency(value: number) {
    return new Intl.NumberFormat("ko-KR").format(value);
  }
  //장바구니에서 현재 선택된 상품들의 가격을 합산된 값입니다.
  const BuyPrice = (selectedItems || []).reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );
  //장바구니에 담긴 전체 상품들의 총 합산 가격입니다.
  const totalPrice = (items || []).reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  //처음 장바구니페이지에 들어오면 getCartlisting()를 통해서 사용자의 장바구니 정보를 서버로부터 받아옵니다.
  //selectClear()이 함수는 이전에 장바구니에서 선택했었던 값들을 초기화해줍니다
  useEffect(() => {
    selectClear();
    getCartlisting();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <CartWrapper>
          <div className="cart_title">CART</div>
          <div>
            <div>
              <div className="cart_length_view">
                <span>상품 {items?.length} 개</span>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <colgroup>
                  <col style={{ width: "5%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "40%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleSelectAll(e.target.checked)
                        }
                        checked={Boolean(
                          items?.length &&
                            selectedItems?.length === items?.length
                        )}
                      />
                    </th>
                    <th>사진</th>
                    <th>상품정보</th>
                    <th>가격</th>
                    <th>수량</th>
                    <th>합계</th>
                    <th>선택</th>
                  </tr>
                </thead>
                <tbody>
                  {items?.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      SelectgoOrder={SelectgoOrder}
                      handleItemSelect={handleItemSelect}
                      plusQuantity={plusQuantity}
                      minusQuantity={minusQuantity}
                      handleDelete={handleDelete}
                      selectedItems={selectedItems}
                      formatCurrency={formatCurrency}
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={7}>
                      총 금액: {formatCurrency(totalPrice)} 원
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div className="cart_deletebtn_box">
                <div>
                  <div className="cart_selected_delete_box">
                    <img src="/img/check.svg" alt="선택" />
                    <div onClick={handleDeleteSelected}>선택상품삭제</div>
                  </div>
                </div>
                <div className="cart_alldelete" onClick={handleDeleteAll}>
                  장바구니 전체삭제
                </div>
              </div>
              <div className="cart_selected_price_box">
                <div className="selected_price_infobox">
                  <div className="marginbox"></div>
                  <div className="selected_price_info">총 결제금액</div>
                </div>
                <div className="selected_price_infobox2">
                  <div className="marginbox"></div>
                  <div className="selected_price_info">
                    {formatCurrency(BuyPrice)} 원
                  </div>
                </div>
              </div>
              <div className="cart_order_btnbox">
                <div className="cart_order_btn" onClick={goOrder}>
                  <img src="/img/ordercheck.svg" alt="체크" />
                  <div>상품 주문하기</div>
                </div>
              </div>
            </div>
          </div>
        </CartWrapper>
      )}
    </>
  );
};

export default ShoppingCart;
