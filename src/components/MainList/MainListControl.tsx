import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";
import {
  getCateItems,
  getSortType,
  getSearchItems,
} from "../../slice/ItemSlice";
import { useState, useEffect } from "react";
import { ControlWrapper } from "./stMainListControl";

const MainListControl = () => {
  const itemCount = useAppSelector((state) => state.item.Totalitems);
  const categoryId = useAppSelector((state) => state.item.categorynum);
  const filtersort = useAppSelector((state) => state.item.catesort);
  const searchkey = useAppSelector((state) => state.item.keyword);
  const dispatch = useAppDispatch();

  //이 state는 사용자가 현재 필터상황을 확인할수있게 스타일컴포넌트에 props로 사용됩니다.
  const [isfilterType, setIsfilterTpye] = useState("");

  //상태값을 감지해서 사용자가 선택한 필터타입이 바뀔때마다 isfilterType에 현재 필터상황을 넣어줍니다.
  useEffect(() => {
    setIsfilterTpye(filtersort);
  }, [filtersort]);

  //최신순, 가격순 등 사용자가 필터를 클릭하면 그 필터에 맞는 아이템들을 보여주기위한 함수입니다.
  //현재 main페이지의 상황이 카테고리를 선택된 상황인지, 검색해서 들어온 상황인지를 판단해서 현재 상황에 맞는 dispatch 를 호출합니다.
  const handleGetCateItems = (category: string) => {
    setIsfilterTpye(category);
    dispatch(getSortType(category));
    if (searchkey) {
      dispatch(getSearchItems({ keyword: searchkey, sorttype: category }));
    } else {
      dispatch(getCateItems({ categoryId, category }));
    }
  };

  return (
    <ControlWrapper $isfilterType={isfilterType}>
      <div className="item_quantity_info">
        <img src="/img/item.svg" alt="item" />
        <div>
          총 <span>{itemCount}</span> 개의 상품이 있습니다.
        </div>
      </div>
      <div>
        <ul className="item_selected_list">
          <li onClick={() => handleGetCateItems("")}>최신순</li>
          <li onClick={() => handleGetCateItems("priceDesc")}>높은가격</li>
          <li onClick={() => handleGetCateItems("priceAsc")}>낮은가격</li>
          <li onClick={() => handleGetCateItems("sales")}>판매순</li>
        </ul>
      </div>
    </ControlWrapper>
  );
};
export default MainListControl;
